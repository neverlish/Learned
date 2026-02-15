import { requireSession } from "@/lib/auth/session";
import NoteEditorWrapper from "@/components/NoteEditorWrapper";
import { getNoteContent } from "@/lib/notes";
import { notFound } from "next/navigation";

interface NotePageProps {
	params: Promise<{ id: string }>;
}

export default async function NotePage({ params }: NotePageProps) {
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
		content = { type: "doc", content: [] };
	}

	return (
		<div className="min-h-screen bg-background">
			<main className="mx-auto max-w-4xl px-4 py-8">
				<h1 className="mb-6 text-3xl font-bold text-foreground">Edit Note</h1>

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
