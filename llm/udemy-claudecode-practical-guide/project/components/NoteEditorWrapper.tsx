"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import NoteEditor from "@/components/NoteEditor";
import { useRouter } from "next/navigation";

interface NoteEditorWrapperProps {
	noteId: string;
	initialTitle: string;
	initialContent: unknown;
	isPublic: boolean;
	publicSlug: string | null;
}

export default function NoteEditorWrapper({
	noteId,
	initialTitle,
	initialContent,
	isPublic,
	publicSlug,
}: NoteEditorWrapperProps) {
	const router = useRouter();
	const [title, setTitle] = useState(initialTitle);
	const [content, setContent] = useState(initialContent);
	const [isPublicState, setIsPublicState] = useState(isPublic);
	const [saving, setSaving] = useState(false);
	const [lastSaved, setLastSaved] = useState<Date | null>(null);
	const [error, setError] = useState("");
	const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

	// Debounced save
	const saveNote = useCallback(async () => {
		setSaving(true);
		setError("");

		try {
			const response = await fetch(`/api/notes/${noteId}`, {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					title,
					contentJson: content,
				}),
			});

			if (!response.ok) {
				throw new Error("Failed to save note");
			}

			setLastSaved(new Date());
		} catch {
			setError("Failed to save note");
		} finally {
			setSaving(false);
		}
	}, [noteId, title, content]);

	// Auto-save with debouncing
	useEffect(() => {
		if (saveTimeoutRef.current) {
			clearTimeout(saveTimeoutRef.current);
		}

		saveTimeoutRef.current = setTimeout(() => {
			saveNote();
		}, 1000); // Save 1 second after last change

		return () => {
			if (saveTimeoutRef.current) {
				clearTimeout(saveTimeoutRef.current);
			}
		};
	}, [title, content, saveNote]);

	// Manual save
	const handleSave = async () => {
		if (saveTimeoutRef.current) {
			clearTimeout(saveTimeoutRef.current);
		}
		await saveNote();
	};

	// Toggle public sharing
	const togglePublic = async () => {
		setError("");
		const newValue = !isPublicState;

		try {
			const response = await fetch(`/api/notes/${noteId}/share`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ isPublic: newValue }),
			});

			if (!response.ok) {
				throw new Error("Failed to update sharing");
			}

			const data = await response.json();
			setIsPublicState(data.isPublic);
			router.refresh();
		} catch {
			setError("Failed to update sharing settings");
		}
	};

	// Delete note
	const deleteNote = async () => {
		if (!confirm("Are you sure you want to delete this note? This cannot be undone.")) {
			return;
		}

		try {
			const response = await fetch(`/api/notes/${noteId}`, {
				method: "DELETE",
			});

			if (!response.ok) {
				throw new Error("Failed to delete note");
			}

			router.push("/dashboard");
		} catch {
			setError("Failed to delete note");
		}
	};

	return (
		<>
			{/* Title Input */}
			<div className="mb-4">
				<input
					type="text"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					placeholder="Note title..."
					className="w-full rounded-lg border border-input bg-background px-4 py-3 text-2xl font-semibold text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
				/>
			</div>

			{/* Status Bar */}
			<div className="mb-2 flex items-center justify-between text-sm">
				<div className="text-muted-foreground">
					{saving ? "Saving..." : lastSaved ? `Saved ${lastSaved.toLocaleTimeString()}` : ""}
				</div>
				{error && <div className="text-destructive">{error}</div>}
			</div>

			{/* TipTap Editor */}
			<NoteEditor
				initialContent={content}
				onChange={(newContent) => setContent(newContent)}
			/>

			{/* Actions */}
			<div className="mt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
				<div className="flex items-center gap-2">
					<label className="flex items-center gap-2 text-sm text-foreground cursor-pointer">
						<input
							type="checkbox"
							checked={isPublicState}
							onChange={togglePublic}
							className="rounded border-input"
						/>
						Make public
					</label>
					{isPublicState && publicSlug && (
						<span className="text-sm text-muted-foreground">
							Sharing at: /p/{publicSlug}
						</span>
					)}
				</div>
				<div className="flex gap-2">
					<button
						type="button"
						onClick={handleSave}
						disabled={saving}
						className="rounded-md bg-primary px-4 py-2 font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
					>
						{saving ? "Saving..." : "Save Now"}
					</button>
					<button
						type="button"
						onClick={deleteNote}
						className="rounded-md bg-destructive px-4 py-2 font-medium text-destructive-foreground hover:bg-destructive/90"
					>
						Delete Note
					</button>
				</div>
			</div>
		</>
	);
}
