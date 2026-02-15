"use client";

import StarterKit from "@tiptap/starter-kit";
import Code from "@tiptap/extension-code";
import CodeBlock from "@tiptap/extension-code-block";
import { useEditor, EditorContent as TiptapEditorContent } from "@tiptap/react";

interface EditorContentProps {
	content: unknown;
}

export default function EditorContent({ content }: EditorContentProps) {
	const editor = useEditor({
		extensions: [
			StarterKit.configure({
				heading: { levels: [1, 2, 3] },
			}),
			Code,
			CodeBlock,
		],
		content,
		editable: false,
		editorProps: {
			attributes: {
				class: "prose prose-sm max-w-none focus:outline-none",
			},
		},
	});

	if (!editor) {
		return null;
	}

	return <TiptapEditorContent editor={editor} />;
}
