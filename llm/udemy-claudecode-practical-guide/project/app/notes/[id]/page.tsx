import Link from "next/link";
import { notFound } from "next/navigation";
import { requireSession } from "@/lib/auth/session";
import { getNoteContent } from "@/lib/notes";
import TipTapRenderer from "@/components/TipTapRenderer";

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
				{/* Header with title and actions */}
				<div className="mb-8">
					<div className="mb-4 flex items-center gap-2 text-sm">
						<Link
							href="/dashboard"
							className="text-muted-foreground hover:text-foreground"
						>
							← Back to Dashboard
						</Link>
					</div>

					<div className="flex items-start justify-between gap-4">
						<div className="flex-1">
							<h1 className="mb-2 text-4xl font-bold text-foreground">
								{note.title}
							</h1>
							<div className="flex items-center gap-4 text-sm text-muted-foreground">
								<span>
									Created: {new Date(note.created_at).toLocaleDateString()}
								</span>
								<span>•</span>
								<span>
									Updated: {new Date(note.updated_at).toLocaleDateString()}
								</span>
								{note.is_public && (
									<>
										<span>•</span>
										<span className="rounded-full bg-primary/10 px-2 py-1 text-xs text-primary">
											Public
										</span>
									</>
								)}
							</div>
						</div>
						<Link
							href={`/notes/${id}/edit`}
							className="rounded-md bg-primary px-4 py-2 font-medium text-primary-foreground hover:bg-primary/90"
						>
							Edit Note
						</Link>
					</div>
				</div>

				{/* Note Content */}
				<article className="rounded-lg border border-border bg-card p-8">
					<TipTapRenderer content={content} />
				</article>

				{/* Public Link */}
				{note.is_public && note.public_slug && (
					<div className="mt-4 rounded-lg border border-border bg-muted/30 p-4">
						<p className="text-sm text-muted-foreground">
							Public link:{" "}
							<Link
								href={`/p/${note.public_slug}`}
								className="text-primary hover:underline"
							>
								{typeof window !== "undefined"
									? window.location.origin
									: ""}/p/{note.public_slug}
							</Link>
						</p>
					</div>
				)}
			</main>
		</div>
	);
}
