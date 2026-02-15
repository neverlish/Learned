import Link from 'next/link';
import { notFound } from 'next/navigation';
import { requireSession } from '@/lib/auth/session';
import NoteEditorWrapper from '@/components/NoteEditorWrapper';
import { getNoteContent } from '@/lib/notes';

interface NoteEditPageProps {
  params: Promise<{ id: string }>;
}

export default async function NoteEditPage({ params }: NoteEditPageProps) {
  const session = await requireSession();
  const { id } = await params;

  // Fetch the note
  const note = await getNoteContent(session.user.id, id);

  if (!note) {
    notFound();
  }

  // Parse content safely
  let content;
  try {
    content = JSON.parse(note.content_json);
  } catch {
    content = { type: 'doc', content: [] };
  }

  return (
    <div className='min-h-screen bg-background'>
      <main className='mx-auto max-w-4xl px-4 py-8'>
        <div className='mb-6 flex items-center justify-between'>
          <div className='flex items-center gap-4'>
            <Link
              href={`/notes/${id}`}
              className='text-sm text-muted-foreground hover:text-foreground'
            >
              ← Back to Note
            </Link>
            <h1 className='text-3xl font-bold text-foreground'>Editing: {note.title}</h1>
          </div>
        </div>

        <NoteEditorWrapper
          noteId={id}
          initialTitle={note.title}
          initialContent={content}
          isPublic={note.is_public}
          publicSlug={note.public_slug}
        />
      </main>
    </div>
  );
}
