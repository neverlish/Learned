import { requireSession } from '@/lib/auth/session';
import { getNotesByUser, createNote } from '@/lib/notes';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export default async function Dashboard() {
  const session = await requireSession();
  const notes = await getNotesByUser(session.user.id);

  async function createNewNote() {
    'use server';
    const userSession = await requireSession();
    const note = await createNote(userSession.user.id, {});
    redirect(`/notes/${note.id}/edit`);
  }

  return (
    <div className='min-h-screen bg-background'>
      <main className='mx-auto max-w-6xl px-4 py-8'>
        <div className='mb-8 flex items-center justify-between'>
          <div>
            <h1 className='text-3xl font-bold text-foreground'>Welcome, {session.user.name}!</h1>
            <p className='mt-1 text-muted-foreground'>
              {notes.length === 0
                ? 'Create your first note to get started'
                : `You have ${notes.length} note${notes.length === 1 ? '' : 's'}`}
            </p>
          </div>
          <form action={createNewNote}>
            <button
              type='submit'
              className='rounded-md bg-primary px-4 py-2 font-medium text-primary-foreground hover:bg-primary/90'
            >
              + New Note
            </button>
          </form>
        </div>

        {notes.length === 0 ? (
          <div className='rounded-lg border border-border bg-card p-12 text-center'>
            <p className='text-muted-foreground'>No notes yet. Create your first note!</p>
          </div>
        ) : (
          <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
            {notes.map((note) => (
              <Link
                key={note.id}
                href={`/notes/${note.id}`}
                className='block rounded-lg border border-border bg-card p-4 transition-colors hover:bg-muted/50'
              >
                <h3 className='mb-2 truncate text-lg font-semibold text-foreground'>
                  {note.title}
                </h3>
                <div className='flex items-center justify-between text-sm'>
                  <span className='text-muted-foreground'>
                    {new Date(note.updated_at).toLocaleDateString()}
                  </span>
                  {note.is_public && (
                    <span className='text-xs rounded-full bg-primary/10 px-2 py-1 text-primary'>
                      Public
                    </span>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
