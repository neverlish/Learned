import { requireSession } from "@/lib/auth/session";
import NoteEditor from "@/components/NoteEditor";

export default async function NotePage({ params }: { params: Promise<{ id: string }> }) {
	const session = await requireSession();
	const { id } = await params;

	return (
		<div className="min-h-screen bg-background">
			<main className="mx-auto max-w-4xl px-4 py-8">
				<h1 className="mb-6 text-3xl font-bold text-foreground">Note Editor</h1>

				{/* Title Input */}
				<div className="mb-4">
					<input
						type="text"
						placeholder="Note title..."
						className="w-full rounded-lg border border-input bg-background px-4 py-3 text-2xl font-semibold text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
						defaultValue="Untitled note"
					/>
				</div>

				{/* TipTap Editor */}
				<NoteEditor
					initialContent={{
						type: "doc",
						content: [
							{
								type: "paragraph",
							},
						],
					}}
					onChange={(content) => {
						console.log("Content changed:", content);
						// TODO: Save to API
					}}
				/>

				{/* Actions */}
				<div className="mt-4 flex items-center justify-between">
					<div className="flex items-center gap-2">
						<label className="flex items-center gap-2 text-sm text-muted-foreground">
							<input type="checkbox" className="rounded border-input" />
							Make public
						</label>
					</div>
					<button
						type="button"
						className="rounded-md bg-destructive px-4 py-2 font-medium text-destructive-foreground hover:bg-destructive/90"
					>
						Delete Note
					</button>
				</div>
			</main>
		</div>
	);
}
