import { notFound } from "next/navigation";
import { getNoteByPublicSlug } from "@/lib/notes";
import EditorContent from "@/components/EditorContent";

interface PublicNotePageProps {
	params: Promise<{ slug: string }>;
}

export default async function PublicNotePage({ params }: PublicNotePageProps) {
	const { slug } = await params;

	// Sanitize slug - ensure it's a valid format
	if (!/^[a-zA-Z0-9_-]+$/.test(slug)) {
		notFound();
	}

	const note = await getNoteByPublicSlug(slug);

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
				<article className="rounded-lg border border-border bg-card p-8">
					<h1 className="mb-6 text-3xl font-bold text-foreground">{note.title}</h1>
					<EditorContent content={content} />
					<div className="mt-8 text-sm text-muted-foreground">
						Public note shared via NoteApp
					</div>
				</article>
			</main>
		</div>
	);
}
