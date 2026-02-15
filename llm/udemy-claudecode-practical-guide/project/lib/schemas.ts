import { z } from 'zod';

// Auth schemas
export const signUpSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  name: z.string().min(1, 'Name is required').max(100, 'Name too long'),
});

export const signInSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

// Note schemas
export const createNoteSchema = z.object({
  title: z.string().min(1, 'Title is required').max(255, 'Title too long').optional(),
  contentJson: z
    .object({
      type: z.string(),
      content: z.array(z.any()).optional(),
    })
    .optional(),
});

export const updateNoteSchema = z.object({
  title: z.string().min(1, 'Title is required').max(255, 'Title too long').optional(),
  contentJson: z
    .object({
      type: z.string(),
      content: z.array(z.any()).optional(),
    })
    .optional(),
});

export const shareNoteSchema = z.object({
  isPublic: z.boolean(),
});

export const noteIdSchema = z.object({
  id: z.string().min(1, 'Note ID is required'),
});

export const slugSchema = z.object({
  slug: z
    .string()
    .min(1, 'Slug is required')
    .regex(/^[a-zA-Z0-9_-]+$/, 'Invalid slug format'),
});

// Types
export type SignUpInput = z.infer<typeof signUpSchema>;
export type SignInInput = z.infer<typeof signInSchema>;
export type CreateNoteInput = z.infer<typeof createNoteSchema>;
export type UpdateNoteInput = z.infer<typeof updateNoteSchema>;
export type ShareNoteInput = z.infer<typeof shareNoteSchema>;
