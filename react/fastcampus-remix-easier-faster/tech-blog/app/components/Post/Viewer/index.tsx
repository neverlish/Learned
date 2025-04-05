import { RichTextEditor } from "@mantine/tiptap";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

export default function PostView({ content }: { content: string }) {
  const editor = useEditor({
    editable: false,
    extensions: [StarterKit],
    content,
  });

  return (
    <>
      <RichTextEditor editor={editor} sx={{ border: "none" }}>
        <RichTextEditor.Content mih={500} />
      </RichTextEditor>
    </>
  );
}