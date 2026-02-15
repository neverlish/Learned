import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock auth before importing api-helpers to prevent db initialization
vi.mock('../../lib/auth', () => ({
	auth: {
		api: {
			getSession: vi.fn(),
		},
	},
}));

import { unauthorized, badRequest, notFound, serverError } from '../../lib/api-helpers';

describe('API Helper Functions', () => {
	describe('unauthorized', () => {
		it('should return a 401 response with correct structure', () => {
			const response = unauthorized();

			expect(response).toBeInstanceOf(Response);
			expect(response.status).toBe(401);
			expect(response.statusText).toBe('Unauthorized');
		});

		it('should return JSON error message', async () => {
			const response = unauthorized();
			const body = await response.json();

			expect(body).toEqual({ error: 'Unauthorized' });
		});

		it('should have correct content-type header', () => {
			const response = unauthorized();
			const contentType = response.headers.get('content-type');

			expect(contentType).toContain('application/json');
		});
	});

	describe('badRequest', () => {
		it('should return a 400 response with correct structure', () => {
			const response = badRequest('Invalid input');

			expect(response).toBeInstanceOf(Response);
			expect(response.status).toBe(400);
			expect(response.statusText).toBe('Bad Request');
		});

		it('should return custom error message', async () => {
			const message = 'Email is required';
			const response = badRequest(message);
			const body = await response.json();

			expect(body).toEqual({ error: message });
		});

		it('should handle empty message', async () => {
			const response = badRequest('');
			const body = await response.json();

			expect(body).toEqual({ error: '' });
		});

		it('should have correct content-type header', () => {
			const response = badRequest('test');
			const contentType = response.headers.get('content-type');

			expect(contentType).toContain('application/json');
		});
	});

	describe('notFound', () => {
		it('should return a 404 response with correct structure', () => {
			const response = notFound();

			expect(response).toBeInstanceOf(Response);
			expect(response.status).toBe(404);
			expect(response.statusText).toBe('Not Found');
		});

		it('should return default error message when none provided', async () => {
			const response = notFound();
			const body = await response.json();

			expect(body).toEqual({ error: 'Resource not found' });
		});

		it('should return custom error message when provided', async () => {
			const message = 'Note not found';
			const response = notFound(message);
			const body = await response.json();

			expect(body).toEqual({ error: message });
		});

		it('should have correct content-type header', () => {
			const response = notFound('test');
			const contentType = response.headers.get('content-type');

			expect(contentType).toContain('application/json');
		});
	});

	describe('serverError', () => {
		it('should return a 500 response with correct structure', () => {
			const response = serverError();

			expect(response).toBeInstanceOf(Response);
			expect(response.status).toBe(500);
			expect(response.statusText).toBe('Internal Server Error');
		});

		it('should return default error message when none provided', async () => {
			const response = serverError();
			const body = await response.json();

			expect(body).toEqual({ error: 'Internal server error' });
		});

		it('should return custom error message when provided', async () => {
			const message = 'Database connection failed';
			const response = serverError(message);
			const body = await response.json();

			expect(body).toEqual({ error: message });
		});

		it('should have correct content-type header', () => {
			const response = serverError('test');
			const contentType = response.headers.get('content-type');

			expect(contentType).toContain('application/json');
		});
	});

	describe('Response consistency', () => {
		it('all helpers should return JSON responses', async () => {
			const responses = [
				unauthorized(),
				badRequest('test'),
				notFound('test'),
				serverError('test'),
			];

			for (const response of responses) {
				const contentType = response.headers.get('content-type');
				expect(contentType).toContain('application/json');

				// Should be parseable as JSON
				expect(async () => await response.json()).not.toThrow();
			}
		});

		it('all helpers should have error property in response', async () => {
			const responses = [
				unauthorized(),
				badRequest('test'),
				notFound('test'),
				serverError('test'),
			];

			for (const response of responses) {
				const body = await response.json();
				expect(body).toHaveProperty('error');
			}
		});
	});
});
