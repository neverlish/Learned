import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
	verifyNoteOwnership,
	createNote,
	getNoteById,
	getNotesByUser,
	getNoteContent,
	updateNote,
	deleteNote,
	setNotePublic,
	getNoteByPublicSlug,
	type Note,
} from '../../lib/notes';

// Mock the database functions
vi.mock('../../lib/db', () => ({
	query: vi.fn(),
	get: vi.fn(),
	run: vi.fn(),
}));

import { query, get, run } from '../../lib/db';

describe('Notes Module', () => {
	const mockUserId = 'user123';
	const mockNoteId = 'note123';
	const mockNote: Note = {
		id: mockNoteId,
		user_id: mockUserId,
		title: 'Test Note',
		content_json: '{"type":"doc","content":[]}',
		is_public: false,
		public_slug: null,
		created_at: '2024-01-01 00:00:00',
		updated_at: '2024-01-01 00:00:00',
	};

	beforeEach(() => {
		vi.clearAllMocks();
	});

	describe('verifyNoteOwnership', () => {
		it('should return true when note belongs to user', async () => {
			vi.mocked(get).mockResolvedValueOnce({
				user_id: mockUserId,
			});

			const result = await verifyNoteOwnership(mockNoteId, mockUserId);

			expect(result).toBe(true);
			expect(get).toHaveBeenCalledWith('SELECT user_id FROM notes WHERE id = ? LIMIT 1', [
				mockNoteId,
			]);
		});

		it('should return false when note belongs to different user', async () => {
			vi.mocked(get).mockResolvedValueOnce({
				user_id: 'different-user',
			});

			const result = await verifyNoteOwnership(mockNoteId, mockUserId);

			expect(result).toBe(false);
		});

		it('should return false when note not found', async () => {
			vi.mocked(get).mockResolvedValueOnce(undefined);

			const result = await verifyNoteOwnership(mockNoteId, mockUserId);

			expect(result).toBe(false);
		});
	});

	describe('createNote', () => {
		it('should create note with title and content', async () => {
			vi.mocked(get).mockResolvedValueOnce(mockNote);

			const note = await createNote(mockUserId, {
				title: 'Test Note',
				contentJson: '{"type":"doc","content":[]}',
			});

			expect(note).toEqual(mockNote);
			expect(run).toHaveBeenCalledWith(
				expect.stringContaining('INSERT INTO notes'),
				expect.any(Array),
			);
		});

		it('should create note with default title when none provided', async () => {
			const noteWithDefaultTitle = { ...mockNote, title: 'Untitled note' };
			vi.mocked(get).mockResolvedValueOnce(noteWithDefaultTitle);

			const note = await createNote(mockUserId, {
				contentJson: '{"type":"doc","content":[]}',
			});

			expect(note).toEqual(noteWithDefaultTitle);
		});

		it('should create note with default content when none provided', async () => {
			vi.mocked(get).mockResolvedValueOnce(mockNote);

			await createNote(mockUserId, {
				title: 'Test Note',
			});

			expect(run).toHaveBeenCalled();
		});

		it('should throw error when note creation fails', async () => {
			vi.mocked(get).mockResolvedValueOnce(undefined);

			await expect(
				createNote(mockUserId, {
					title: 'Test Note',
				}),
			).rejects.toThrow('Failed to create note');
		});
	});

	describe('getNoteById', () => {
		it('should return note when found and belongs to user', async () => {
			vi.mocked(get).mockResolvedValueOnce(mockNote);

			const note = await getNoteById(mockUserId, mockNoteId);

			expect(note).toEqual(mockNote);
			expect(get).toHaveBeenCalledWith('SELECT * FROM notes WHERE id = ? AND user_id = ? LIMIT 1', [
				mockNoteId,
				mockUserId,
			]);
		});

		it('should return undefined when note not found', async () => {
			vi.mocked(get).mockResolvedValueOnce(undefined);

			const note = await getNoteById(mockUserId, 'nonexistent');

			expect(note).toBeUndefined();
		});

		it('should return undefined when note belongs to different user', async () => {
			vi.mocked(get).mockResolvedValueOnce(undefined);

			const note = await getNoteById('different-user', mockNoteId);

			expect(note).toBeUndefined();
		});
	});

	describe('getNoteContent', () => {
		it('should return full note content', async () => {
			vi.mocked(get).mockResolvedValueOnce(mockNote);

			const note = await getNoteContent(mockUserId, mockNoteId);

			expect(note).toEqual(mockNote);
			expect(get).toHaveBeenCalledWith('SELECT * FROM notes WHERE id = ? AND user_id = ? LIMIT 1', [
				mockNoteId,
				mockUserId,
			]);
		});
	});

	describe('getNotesByUser', () => {
		it('should return array of notes for user', async () => {
			const mockNotes: Note[] = [mockNote, { ...mockNote, id: 'note456' }];
			vi.mocked(query).mockResolvedValueOnce(mockNotes);

			const notes = await getNotesByUser(mockUserId);

			expect(notes).toEqual(mockNotes);
			expect(query).toHaveBeenCalledWith(
				expect.stringContaining('SELECT id, title, is_public, public_slug'),
				[mockUserId],
			);
		});

		it('should return empty array when user has no notes', async () => {
			vi.mocked(query).mockResolvedValueOnce([]);

			const notes = await getNotesByUser(mockUserId);

			expect(notes).toEqual([]);
		});

		it('should order notes by updated_at desc', async () => {
			vi.mocked(query).mockResolvedValueOnce([]);

			await getNotesByUser(mockUserId);

			const call = vi.mocked(query).mock.calls[0];
			expect(call[0]).toContain('ORDER BY updated_at DESC');
		});
	});

	describe('getNoteContent', () => {
		it('should return full note content', async () => {
			vi.mocked(get).mockResolvedValueOnce(mockNote);

			const note = await getNoteContent(mockUserId, mockNoteId);

			expect(note).toEqual(mockNote);
			expect(get).toHaveBeenCalledWith('SELECT * FROM notes WHERE id = ? AND user_id = ? LIMIT 1', [
				mockNoteId,
				mockUserId,
			]);
		});
	});

	describe('updateNote', () => {
		it('should update note title', async () => {
			vi.mocked(get)
				.mockResolvedValueOnce({ user_id: mockUserId }) // Ownership check
				.mockResolvedValueOnce({ ...mockNote, title: 'Updated Title' }); // Updated note

			const note = await updateNote(mockUserId, mockNoteId, {
				title: 'Updated Title',
			});

			expect(note).toBeDefined();
			expect(note?.title).toBe('Updated Title');
			expect(run).toHaveBeenCalledWith(expect.stringContaining('UPDATE notes'), expect.any(Array));
		});

		it('should update note content', async () => {
			const newContent = '{"type":"doc","content":[{"type":"paragraph"}]}';
			vi.mocked(get)
				.mockResolvedValueOnce({ user_id: mockUserId })
				.mockResolvedValueOnce({ ...mockNote, content_json: newContent });

			const note = await updateNote(mockUserId, mockNoteId, {
				contentJson: newContent,
			});

			expect(note).toBeDefined();
			expect(note?.content_json).toBe(newContent);
		});

		it('should update both title and content', async () => {
			const newTitle = 'Updated Title';
			const newContent = '{"type":"doc","content":[]}';
			vi.mocked(get)
				.mockResolvedValueOnce({ user_id: mockUserId })
				.mockResolvedValueOnce({ ...mockNote, title: newTitle, content_json: newContent });

			const note = await updateNote(mockUserId, mockNoteId, {
				title: newTitle,
				contentJson: newContent,
			});

			expect(note).toBeDefined();
		});

		it('should return undefined when user does not own note', async () => {
			vi.mocked(get).mockResolvedValueOnce({ user_id: 'different-user' });

			const note = await updateNote(mockUserId, mockNoteId, {
				title: 'Updated Title',
			});

			expect(note).toBeUndefined();
		});

		it('should return current note when no updates provided', async () => {
			vi.mocked(get)
				.mockResolvedValueOnce({ user_id: mockUserId })
				.mockResolvedValueOnce(mockNote);

			const note = await updateNote(mockUserId, mockNoteId, {});

			expect(note).toEqual(mockNote);
		});
	});

	describe('deleteNote', () => {
		it('should delete note when user owns it', async () => {
			vi.mocked(get).mockResolvedValueOnce({ user_id: mockUserId });

			const result = await deleteNote(mockUserId, mockNoteId);

			expect(result).toBe(true);
			expect(run).toHaveBeenCalledWith('DELETE FROM notes WHERE id = ? AND user_id = ?', [
				mockNoteId,
				mockUserId,
			]);
		});

		it('should return false when user does not own note', async () => {
			vi.mocked(get).mockResolvedValueOnce({ user_id: 'different-user' });

			const result = await deleteNote(mockUserId, mockNoteId);

			expect(result).toBe(false);
			expect(run).not.toHaveBeenCalled();
		});
	});

	describe('setNotePublic', () => {
		it('should set note as public with new slug', async () => {
			const testSlug = 'test_slug_abc123';
			vi.mocked(get)
				.mockResolvedValueOnce({ user_id: mockUserId }) // Ownership check
				.mockResolvedValueOnce({ public_slug: null }) // Current slug check
				.mockResolvedValueOnce(undefined) // generateUniqueSlug - existing check returns undefined
				.mockResolvedValueOnce({ ...mockNote, is_public: true, public_slug: testSlug }); // getNoteById

			const note = await setNotePublic(mockUserId, mockNoteId, true);

			expect(note).toBeDefined();
			expect(note?.is_public).toBe(true);
			expect(note?.public_slug).toBeTruthy();
		});

		it('should keep existing slug when already set', async () => {
			const existingSlug = 'existing-slug';
			vi.mocked(get)
				.mockResolvedValueOnce({ user_id: mockUserId })
				.mockResolvedValueOnce({ public_slug: existingSlug })
				.mockResolvedValueOnce({ ...mockNote, is_public: true, public_slug: existingSlug });

			const note = await setNotePublic(mockUserId, mockNoteId, true);

			expect(note).toBeDefined();
			expect(note?.public_slug).toBe(existingSlug);
		});

		it('should set note as private and remove slug', async () => {
			vi.mocked(get)
				.mockResolvedValueOnce({ user_id: mockUserId })
				.mockResolvedValueOnce({ ...mockNote, is_public: false, public_slug: null });

			const note = await setNotePublic(mockUserId, mockNoteId, false);

			expect(note).toBeDefined();
			expect(note?.is_public).toBe(false);
			expect(note?.public_slug).toBeNull();
		});

		it('should return undefined when user does not own note', async () => {
			vi.mocked(get).mockResolvedValueOnce({ user_id: 'different-user' });

			const note = await setNotePublic(mockUserId, mockNoteId, true);

			expect(note).toBeUndefined();
		});
	});

	describe('getNoteByPublicSlug', () => {
		it('should return public note by slug', async () => {
			const publicSlug = 'my-public-note';
			vi.mocked(get).mockResolvedValueOnce({ ...mockNote, is_public: true, public_slug: publicSlug });

			const note = await getNoteByPublicSlug(publicSlug);

			expect(note).toBeDefined();
			expect(note?.is_public).toBe(true);
			expect(get).toHaveBeenCalledWith(
				'SELECT * FROM notes WHERE public_slug = ? AND is_public = 1 LIMIT 1',
				[publicSlug],
			);
		});

		it('should return undefined when slug not found', async () => {
			vi.mocked(get).mockResolvedValueOnce(undefined);

			const note = await getNoteByPublicSlug('nonexistent-slug');

			expect(note).toBeUndefined();
		});

		it('should return undefined for private notes (is_public=0)', async () => {
			// Simulate SQL query returning no results for private notes
			vi.mocked(get).mockResolvedValueOnce(undefined);

			const note = await getNoteByPublicSlug('private-note-slug');

			expect(note).toBeUndefined();
		});
	});
});
