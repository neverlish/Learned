import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GET, POST } from '../../app/api/notes/route';
import { unauthorized, badRequest } from '../../lib/api-helpers';
import { getNotesByUser, createNote } from '../../lib/notes';

// Mock dependencies
vi.mock('../../lib/api-helpers', () => ({
	unauthorized: vi.fn(() => new Response('Unauthorized', { status: 401 })),
	badRequest: vi.fn((msg) => new Response(JSON.stringify({ error: msg }), { status: 400 })),
	getAuthenticatedUser: vi.fn(),
}));

vi.mock('../../lib/notes', () => ({
	getNotesByUser: vi.fn(),
	createNote: vi.fn(),
}));

vi.mock('../../lib/schemas', () => ({
	createNoteSchema: {
		safeParse: vi.fn(),
	},
}));

import { getAuthenticatedUser } from '../../lib/api-helpers';
import { createNoteSchema } from '../../lib/schemas';

describe('GET /api/notes', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it('should return 401 when user not authenticated', async () => {
		vi.mocked(getAuthenticatedUser).mockResolvedValueOnce(null);

		const response = await GET();

		expect(response.status).toBe(401);
		expect(unauthorized).toHaveBeenCalled();
	});

	it('should return user notes when authenticated', async () => {
		const mockUser = { id: 'user123', name: 'Test User', email: 'test@example.com' };
		const mockNotes = [
			{
				id: 'note1',
				title: 'Note 1',
				is_public: false,
				public_slug: null,
				created_at: '2024-01-01',
				updated_at: '2024-01-01',
			},
		];

		vi.mocked(getAuthenticatedUser).mockResolvedValueOnce(mockUser);
		vi.mocked(getNotesByUser).mockResolvedValueOnce(mockNotes as any);

		const response = await GET();
		const body = await response.json();

		expect(response.status).toBe(200);
		expect(body).toEqual(mockNotes);
		expect(getNotesByUser).toHaveBeenCalledWith(mockUser.id);
	});

	it('should return 500 on error', async () => {
		const mockUser = { id: 'user123', name: 'Test User', email: 'test@example.com' };

		vi.mocked(getAuthenticatedUser).mockResolvedValueOnce(mockUser);
		vi.mocked(getNotesByUser).mockRejectedValueOnce(new Error('Database error'));

		const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

		const response = await GET();

		expect(response.status).toBe(500);

		consoleSpy.mockRestore();
	});
});

describe('POST /api/notes', () => {
	const mockRequest = (body: any) =>
		({
			json: async () => body,
		}) as Request;

	beforeEach(() => {
		vi.clearAllMocks();
	});

	it('should return 401 when user not authenticated', async () => {
		vi.mocked(getAuthenticatedUser).mockResolvedValueOnce(null);

		const response = await POST(mockRequest({}));

		expect(response.status).toBe(401);
		expect(unauthorized).toHaveBeenCalled();
	});

	it('should return 400 for invalid input', async () => {
		const mockUser = { id: 'user123', name: 'Test User', email: 'test@example.com' };
		vi.mocked(getAuthenticatedUser).mockResolvedValueOnce(mockUser);

		vi.mocked(createNoteSchema).safeParse.mockReturnValueOnce({
			success: false,
			error: {
				issues: [{ message: 'Title is required' }],
			},
		} as any);

		const response = await POST(mockRequest({ title: '' }));

		expect(response.status).toBe(400);
		expect(badRequest).toHaveBeenCalledWith('Title is required');
	});

	it('should create note with valid input', async () => {
		const mockUser = { id: 'user123', name: 'Test User', email: 'test@example.com' };
		const newNote = {
			id: 'note1',
			title: 'Test Note',
			content_json: '{"type":"doc","content":[]}',
			is_public: false,
			public_slug: null,
			user_id: 'user123',
			created_at: '2024-01-01',
			updated_at: '2024-01-01',
		};

		vi.mocked(getAuthenticatedUser).mockResolvedValueOnce(mockUser);

		vi.mocked(createNoteSchema).safeParse.mockReturnValueOnce({
			success: true,
			data: {
				title: 'Test Note',
				contentJson: { type: 'doc', content: [] },
			},
		} as any);

		vi.mocked(createNote).mockResolvedValueOnce(newNote as any);

		const response = await POST(
			mockRequest({
				title: 'Test Note',
				contentJson: { type: 'doc', content: [] },
			}),
		);

		const body = await response.json();

		expect(response.status).toBe(201);
		expect(body).toEqual(newNote);
		expect(createNote).toHaveBeenCalledWith(
			mockUser.id,
			expect.objectContaining({
				title: 'Test Note',
			}),
		);
	});

	it('should create note with default content when not provided', async () => {
		const mockUser = { id: 'user123', name: 'Test User', email: 'test@example.com' };
		const newNote = {
			id: 'note1',
			title: 'Test Note',
			content_json: '{"type":"doc","content":[]}',
			is_public: false,
			public_slug: null,
			user_id: 'user123',
			created_at: '2024-01-01',
			updated_at: '2024-01-01',
		};

		vi.mocked(getAuthenticatedUser).mockResolvedValueOnce(mockUser);

		vi.mocked(createNoteSchema).safeParse.mockReturnValueOnce({
			success: true,
			data: {
				title: 'Test Note',
			},
		} as any);

		vi.mocked(createNote).mockResolvedValueOnce(newNote as any);

		const response = await POST(mockRequest({ title: 'Test Note' }));

		expect(response.status).toBe(201);
		expect(createNote).toHaveBeenCalledWith(mockUser.id, expect.any(Object));
	});

	it('should return 500 on error', async () => {
		const mockUser = { id: 'user123', name: 'Test User', email: 'test@example.com' };

		vi.mocked(getAuthenticatedUser).mockResolvedValueOnce(mockUser);

		vi.mocked(createNoteSchema).safeParse.mockReturnValueOnce({
			success: true,
			data: { title: 'Test Note' },
		} as any);

		vi.mocked(createNote).mockRejectedValueOnce(new Error('Database error'));

		const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

		const response = await POST(mockRequest({ title: 'Test Note' }));

		expect(response.status).toBe(500);

		consoleSpy.mockRestore();
	});
});
