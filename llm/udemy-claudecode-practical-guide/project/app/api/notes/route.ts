import { getAuthenticatedUser, unauthorized, badRequest } from '@/lib/api-helpers';
import { getNotesByUser, createNote } from '@/lib/notes';
import { createNoteSchema } from '@/lib/schemas';

// GET /api/notes - List all notes for authenticated user
export async function GET() {
  const user = await getAuthenticatedUser();
  if (!user) {
    return unauthorized();
  }

  try {
    const notes = await getNotesByUser(user.id);
    return Response.json(notes);
  } catch (error) {
    console.error('Error fetching notes:', error);
    return Response.json({ error: 'Failed to fetch notes' }, { status: 500 });
  }
}

// POST /api/notes - Create a new note
export async function POST(request: Request) {
  const user = await getAuthenticatedUser();
  if (!user) {
    return unauthorized();
  }

  try {
    const body = await request.json();

    // Validate input
    const result = createNoteSchema.safeParse(body);
    if (!result.success) {
      return badRequest(result.error.issues[0].message);
    }

    const note = await createNote(user.id, {
      title: result.data.title,
      contentJson: result.data.contentJson ? JSON.stringify(result.data.contentJson) : undefined,
    });

    return Response.json(note, { status: 201 });
  } catch (error) {
    console.error('Error creating note:', error);
    return Response.json({ error: 'Failed to create note' }, { status: 500 });
  }
}
