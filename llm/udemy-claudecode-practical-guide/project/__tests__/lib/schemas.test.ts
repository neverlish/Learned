import { describe, it, expect } from 'vitest';
import {
	signUpSchema,
	signInSchema,
	createNoteSchema,
	updateNoteSchema,
	shareNoteSchema,
	noteIdSchema,
	slugSchema,
	type SignUpInput,
	type SignInInput,
	type CreateNoteInput,
	type UpdateNoteInput,
	type ShareNoteInput,
} from '../../lib/schemas';

describe('Validation Schemas', () => {
	describe('signUpSchema', () => {
		it('should validate valid sign up data', () => {
			const validData: SignUpInput = {
				email: 'test@example.com',
				password: 'password123',
				name: 'Test User',
			};

			const result = signUpSchema.safeParse(validData);
			expect(result.success).toBe(true);
			if (result.success) {
				expect(result.data).toEqual(validData);
			}
		});

		it('should reject invalid email', () => {
			const invalidData = {
				email: 'not-an-email',
				password: 'password123',
				name: 'Test User',
			};

			const result = signUpSchema.safeParse(invalidData);
			expect(result.success).toBe(false);
			if (!result.success) {
				expect(result.error.issues[0].message).toContain('email');
			}
		});

		it('should reject password shorter than 8 characters', () => {
			const invalidData = {
				email: 'test@example.com',
				password: 'short',
				name: 'Test User',
			};

			const result = signUpSchema.safeParse(invalidData);
			expect(result.success).toBe(false);
			if (!result.success) {
				expect(result.error.issues[0].message).toContain('8 characters');
			}
		});

		it('should reject empty name', () => {
			const invalidData = {
				email: 'test@example.com',
				password: 'password123',
				name: '',
			};

			const result = signUpSchema.safeParse(invalidData);
			expect(result.success).toBe(false);
		});

		it('should reject name longer than 100 characters', () => {
			const invalidData = {
				email: 'test@example.com',
				password: 'password123',
				name: 'a'.repeat(101),
			};

			const result = signUpSchema.safeParse(invalidData);
			expect(result.success).toBe(false);
			if (!result.success) {
				expect(result.error.issues[0].message).toContain('too long');
			}
		});
	});

	describe('signInSchema', () => {
		it('should validate valid sign in data', () => {
			const validData: SignInInput = {
				email: 'test@example.com',
				password: 'password123',
			};

			const result = signInSchema.safeParse(validData);
			expect(result.success).toBe(true);
		});

		it('should reject invalid email', () => {
			const invalidData = {
				email: 'not-an-email',
				password: 'password123',
			};

			const result = signInSchema.safeParse(invalidData);
			expect(result.success).toBe(false);
		});

		it('should reject empty password', () => {
			const invalidData = {
				email: 'test@example.com',
				password: '',
			};

			const result = signInSchema.safeParse(invalidData);
			expect(result.success).toBe(false);
		});
	});

	describe('createNoteSchema', () => {
		it('should accept valid note with title and content', () => {
			const validData: CreateNoteInput = {
				title: 'Test Note',
				contentJson: { type: 'doc', content: [] },
			};

			const result = createNoteSchema.safeParse(validData);
			expect(result.success).toBe(true);
		});

		it('should accept note with only title', () => {
			const validData: CreateNoteInput = {
				title: 'Test Note',
			};

			const result = createNoteSchema.safeParse(validData);
			expect(result.success).toBe(true);
		});

		it('should accept note with only content', () => {
			const validData: CreateNoteInput = {
				contentJson: { type: 'doc', content: [] },
			};

			const result = createNoteSchema.safeParse(validData);
			expect(result.success).toBe(true);
		});

		it('should accept empty object (all optional)', () => {
			const validData: CreateNoteInput = {};

			const result = createNoteSchema.safeParse(validData);
			expect(result.success).toBe(true);
		});

		it('should reject empty title when provided', () => {
			const invalidData = {
				title: '',
			};

			const result = createNoteSchema.safeParse(invalidData);
			expect(result.success).toBe(false);
		});

		it('should reject title longer than 255 characters', () => {
			const invalidData = {
				title: 'a'.repeat(256),
			};

			const result = createNoteSchema.safeParse(invalidData);
			expect(result.success).toBe(false);
		});
	});

	describe('updateNoteSchema', () => {
		it('should accept valid update with title', () => {
			const validData: UpdateNoteInput = {
				title: 'Updated Title',
			};

			const result = updateNoteSchema.safeParse(validData);
			expect(result.success).toBe(true);
		});

		it('should accept valid update with content', () => {
			const validData: UpdateNoteInput = {
				contentJson: { type: 'doc', content: [{ type: 'paragraph' }] },
			};

			const result = updateNoteSchema.safeParse(validData);
			expect(result.success).toBe(true);
		});

		it('should accept update with both fields', () => {
			const validData: UpdateNoteInput = {
				title: 'Updated Title',
				contentJson: { type: 'doc', content: [] },
			};

			const result = updateNoteSchema.safeParse(validData);
			expect(result.success).toBe(true);
		});

		it('should accept empty object (no updates)', () => {
			const validData: UpdateNoteInput = {};

			const result = updateNoteSchema.safeParse(validData);
			expect(result.success).toBe(true);
		});
	});

	describe('shareNoteSchema', () => {
		it('should accept valid share data with true', () => {
			const validData: ShareNoteInput = {
				isPublic: true,
			};

			const result = shareNoteSchema.safeParse(validData);
			expect(result.success).toBe(true);
		});

		it('should accept valid share data with false', () => {
			const validData: ShareNoteInput = {
				isPublic: false,
			};

			const result = shareNoteSchema.safeParse(validData);
			expect(result.success).toBe(true);
		});

		it('should reject non-boolean values', () => {
			const invalidData = {
				isPublic: 'true',
			};

			const result = shareNoteSchema.safeParse(invalidData);
			expect(result.success).toBe(false);
		});
	});

	describe('noteIdSchema', () => {
		it('should accept valid note ID', () => {
			const validData = {
				id: 'abc123',
			};

			const result = noteIdSchema.safeParse(validData);
			expect(result.success).toBe(true);
		});

		it('should reject empty ID', () => {
			const invalidData = {
				id: '',
			};

			const result = noteIdSchema.safeParse(invalidData);
			expect(result.success).toBe(false);
		});
	});

	describe('slugSchema', () => {
		it('should accept valid slug with alphanumeric characters', () => {
			const validData = {
				slug: 'abc123',
			};

			const result = slugSchema.safeParse(validData);
			expect(result.success).toBe(true);
		});

		it('should accept valid slug with hyphens', () => {
			const validData = {
				slug: 'my-note-slug',
			};

			const result = slugSchema.safeParse(validData);
			expect(result.success).toBe(true);
		});

		it('should accept valid slug with underscores', () => {
			const validData = {
				slug: 'my_note_slug',
			};

			const result = slugSchema.safeParse(validData);
			expect(result.success).toBe(true);
		});

		it('should reject slug with special characters', () => {
			const invalidData = {
				slug: 'my-slug!',
			};

			const result = slugSchema.safeParse(invalidData);
			expect(result.success).toBe(false);
			if (!result.success) {
				expect(result.error.issues[0].message).toContain('Invalid slug format');
			}
		});

		it('should reject slug with spaces', () => {
			const invalidData = {
				slug: 'my slug',
			};

			const result = slugSchema.safeParse(invalidData);
			expect(result.success).toBe(false);
		});

		it('should reject empty slug', () => {
			const invalidData = {
				slug: '',
			};

			const result = slugSchema.safeParse(invalidData);
			expect(result.success).toBe(false);
		});
	});
});
