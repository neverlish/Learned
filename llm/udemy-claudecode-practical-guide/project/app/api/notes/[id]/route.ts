import { getAuthenticatedUser, unauthorized, badRequest, notFound } from '@/lib/api-helpers';
import { getNoteContent, updateNote, deleteNote } from '@/lib/notes';
import { updateNoteSchema, noteIdSchema } from '@/lib/schemas';

interface RouteContext {
  params: Promise<{ id: string }>;
}

// GET /api/notes/[id] - Get a single note
export async function GET(request: Request, context: RouteContext) {
  const user = await getAuthenticatedUser();
  if (!user) {
    return unauthorized();
  }

  const { id } = await context.params;

  try {
    const note = await getNoteContent(user.id, id);
    if (!note) {
      return notFound('Note not found');
    }

    return Response.json(note);
  } catch (error) {
    console.error('Error fetching note:', error);
    return Response.json({ error: 'Failed to fetch note' }, { status: 500 });
  }
}

// PUT /api/notes/[id] - Update a note
export async function PUT(request: Request, context: RouteContext) {
  const user = await getAuthenticatedUser();
  if (!user) {
    return unauthorized();
  }

  const { id } = await context.params;

  try {
    const body = await request.json();

    // Validate input
    const result = updateNoteSchema.safeParse(body);
    if (!result.success) {
      return badRequest(result.error.issues[0].message);
    }

    const note = await updateNote(user.id, id, {
      title: result.data.title,
      contentJson: result.data.contentJson ? JSON.stringify(result.data.contentJson) : undefined,
    });

    if (!note) {
      return notFound('Note not found');
    }

    return Response.json(note);
  } catch (error) {
    console.error('Error updating note:', error);
    return Response.json({ error: 'Failed to update note' }, { status: 500 });
  }
}

// DELETE /api/notes/[id] - Delete a note
export async function DELETE(request: Request, context: RouteContext) {
  const user = await getAuthenticatedUser();
  if (!user) {
    return unauthorized();
  }

  const { id } = await context.params;

  try {
    const success = await deleteNote(user.id, id);
    if (!success) {
      return notFound('Note not found');
    }

    return new Response(null, { status: 204 });
  } catch (error) {
    console.error('Error deleting note:', error);
    return Response.json({ error: 'Failed to delete note' }, { status: 500 });
  }
}
