import { nanoid } from 'nanoid';
import { query, get, run } from './db';

// Simple ID generator
function generateId(): string {
	return nanoid(16);
}

export type Note = {
  id: string;
  user_id: string;
  title: string;
  content_json: string;
  is_public: boolean;
  public_slug: string | null;
  created_at: string;
  updated_at: string;
};

// Helper: Generate unique public slug with retry logic
async function generateUniqueSlug(): Promise<string> {
  const maxAttempts = 10;
  for (let i = 0; i < maxAttempts; i++) {
    const slug = nanoid(16);
    const existing = await get<{ id: string }>(
      'SELECT id FROM notes WHERE public_slug = ? LIMIT 1',
      [slug],
    );
    if (!existing) {
      return slug;
    }
  }
  throw new Error('Failed to generate unique slug after multiple attempts');
}

// Helper: Verify note ownership
export async function verifyNoteOwnership(noteId: string, userId: string): Promise<boolean> {
  const note = await get<{ user_id: string }>('SELECT user_id FROM notes WHERE id = ? LIMIT 1', [
    noteId,
  ]);
  return note?.user_id === userId;
}

// Create a new note
export async function createNote(
  userId: string,
  data: { title?: string; contentJson?: string },
): Promise<Note> {
  const id = generateId();
  const title = data.title || 'Untitled note';
  const contentJson = data.contentJson || JSON.stringify({ type: 'doc', content: [] });

  run(
    `INSERT INTO notes (id, user_id, title, content_json, is_public, public_slug, created_at, updated_at)
		 VALUES (?, ?, ?, ?, 0, NULL, datetime('now'), datetime('now'))`,
    [id, userId, title, contentJson],
  );

  const note = await getNoteById(userId, id);
  if (!note) {
    throw new Error('Failed to create note');
  }
  return note;
}

// Get note by ID (with ownership check)
export async function getNoteById(userId: string, noteId: string): Promise<Note | undefined> {
  const note = await get<Note>('SELECT * FROM notes WHERE id = ? AND user_id = ? LIMIT 1', [
    noteId,
    userId,
  ]);
  return note || undefined;
}

// Get all notes for a user
export async function getNotesByUser(userId: string): Promise<Note[]> {
  return query<Note>(
    `SELECT id, title, is_public, public_slug, created_at, updated_at
		 FROM notes
		 WHERE user_id = ?
		 ORDER BY updated_at DESC`,
    [userId],
  );
}

// Get full note content by ID
export async function getNoteContent(userId: string, noteId: string): Promise<Note | undefined> {
  return get<Note>('SELECT * FROM notes WHERE id = ? AND user_id = ? LIMIT 1', [noteId, userId]);
}

// Update note
export async function updateNote(
  userId: string,
  noteId: string,
  data: { title?: string; contentJson?: string },
): Promise<Note | undefined> {
  // Verify ownership
  const hasAccess = await verifyNoteOwnership(noteId, userId);
  if (!hasAccess) {
    return undefined;
  }

  const updates: string[] = [];
  const values: unknown[] = [];

  if (data.title !== undefined) {
    updates.push('title = ?');
    values.push(data.title);
  }
  if (data.contentJson !== undefined) {
    updates.push('content_json = ?');
    values.push(data.contentJson);
  }

  if (updates.length === 0) {
    return getNoteById(userId, noteId);
  }

  updates.push("updated_at = datetime('now')");
  values.push(noteId, userId);

  run(`UPDATE notes SET ${updates.join(', ')} WHERE id = ? AND user_id = ?`, values);

  return getNoteById(userId, noteId);
}

// Delete note
export async function deleteNote(userId: string, noteId: string): Promise<boolean> {
  // Verify ownership
  const hasAccess = await verifyNoteOwnership(noteId, userId);
  if (!hasAccess) {
    return false;
  }

  run('DELETE FROM notes WHERE id = ? AND user_id = ?', [noteId, userId]);
  return true;
}

// Set note public/private
export async function setNotePublic(
  userId: string,
  noteId: string,
  isPublic: boolean,
): Promise<Note | undefined> {
  // Verify ownership
  const hasAccess = await verifyNoteOwnership(noteId, userId);
  if (!hasAccess) {
    return undefined;
  }

  if (isPublic) {
    // Check if already has a slug
    const current = await get<{ public_slug: string | null }>(
      'SELECT public_slug FROM notes WHERE id = ?',
      [noteId],
    );

    let slug = current?.public_slug;
    if (!slug) {
      // Generate new unique slug
      slug = await generateUniqueSlug();
      run(
        "UPDATE notes SET is_public = 1, public_slug = ?, updated_at = datetime('now') WHERE id = ?",
        [slug, noteId],
      );
    } else {
      run("UPDATE notes SET is_public = 1, updated_at = datetime('now') WHERE id = ?", [noteId]);
    }
  } else {
    // Make private - remove slug
    run(
      "UPDATE notes SET is_public = 0, public_slug = NULL, updated_at = datetime('now') WHERE id = ?",
      [noteId],
    );
  }

  return getNoteById(userId, noteId);
}

// Get public note by slug (no auth required)
export async function getNoteByPublicSlug(slug: string): Promise<Note | undefined> {
  const note = await get<Note>(
    'SELECT * FROM notes WHERE public_slug = ? AND is_public = 1 LIMIT 1',
    [slug],
  );
  return note || undefined;
}
