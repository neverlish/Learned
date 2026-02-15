'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Code from '@tiptap/extension-code';
import CodeBlock from '@tiptap/extension-code-block';
import type { Content } from '@tiptap/react';
import { useEffect } from 'react';

interface NoteEditorProps {
  initialContent?: Content;
  onChange?: (content: Content) => void;
}

const ToolbarButton = ({
  onClick,
  active = false,
  children,
  disabled = false,
}: {
  onClick: () => void;
  active?: boolean;
  children: React.ReactNode;
  disabled?: boolean;
}) => (
  <button
    type='button'
    onClick={onClick}
    disabled={disabled}
    className={`rounded px-2 py-1 text-sm font-medium transition-colors ${
      active
        ? 'bg-primary text-primary-foreground'
        : 'text-muted-foreground hover:bg-muted hover:text-foreground'
    } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
  >
    {children}
  </button>
);

const ToolbarSeparator = () => <div className='w-px bg-border' />;

export default function NoteEditor({ initialContent, onChange }: NoteEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] },
      }),
      Code,
      CodeBlock,
    ],
    content: initialContent || { type: 'doc', content: [] },
    onUpdate: ({ editor }) => {
      onChange?.(editor.getJSON());
    },
    editorProps: {
      attributes: {
        class: 'focus:outline-none min-h-[400px] px-4 py-3',
      },
    },
  });

  // Update editor content when initialContent changes externally
  useEffect(() => {
    if (editor && initialContent) {
      // Small delay to ensure editor is ready
      const timeout = setTimeout(() => {
        const currentJSON = editor.getJSON();
        // Only update if content is meaningfully different
        if (JSON.stringify(currentJSON) !== JSON.stringify(initialContent)) {
          editor.commands.setContent(initialContent);
        }
      }, 0);
      return () => clearTimeout(timeout);
    }
  }, [editor, initialContent]);

  if (!editor) {
    return null;
  }

  return (
    <div className='rounded-lg border border-border bg-card'>
      {/* Toolbar */}
      <div className='flex flex-wrap items-center gap-1 border-b border-border bg-muted/30 p-2'>
        {/* Text Formatting */}
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          active={editor.isActive('bold')}
        >
          Bold
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          active={editor.isActive('italic')}
        >
          Italic
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleCode().run()}
          active={editor.isActive('code')}
        >
          &lt;/&gt;
        </ToolbarButton>

        <ToolbarSeparator />

        {/* Headings */}
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          active={editor.isActive('heading', { level: 1 })}
        >
          H1
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          active={editor.isActive('heading', { level: 2 })}
        >
          H2
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          active={editor.isActive('heading', { level: 3 })}
        >
          H3
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().setParagraph().run()}
          active={editor.isActive('paragraph')}
        >
          P
        </ToolbarButton>

        <ToolbarSeparator />

        {/* Lists */}
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          active={editor.isActive('bulletList')}
        >
          • List
        </ToolbarButton>

        <ToolbarSeparator />

        {/* Code Block */}
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          active={editor.isActive('codeBlock')}
        >
          {'{}'}
        </ToolbarButton>

        <ToolbarSeparator />

        {/* Horizontal Rule */}
        <ToolbarButton onClick={() => editor.chain().focus().setHorizontalRule().run()}>
          —
        </ToolbarButton>
      </div>

      {/* Editor Content */}
      <EditorContent editor={editor} className='p-4' />
    </div>
  );
}
