import React from 'react';

// TipTap node types
interface TipTapTextNode {
  type: 'text';
  text: string;
  marks?: Array<{ type: string }>;
}

interface TipTapNode {
  type: string;
  attrs?: Record<string, unknown>;
  content?: TipTapNode[];
  text?: string;
}

interface TipTapDoc {
  type: 'doc';
  content: TipTapNode[];
}

// Render a single text node with marks
function renderText(node: TipTapTextNode): React.ReactNode {
  const { text, marks } = node;
  if (!marks || marks.length === 0) {
    return text;
  }

  let result: React.ReactNode = text;

  // Apply marks from right to left (they nest)
  for (const mark of [...marks].reverse()) {
    switch (mark.type) {
      case 'bold':
        result = <strong key={Math.random()}>{result}</strong>;
        break;
      case 'italic':
        result = <em key={Math.random()}>{result}</em>;
        break;
      case 'code':
        result = (
          <code key={Math.random()} className='rounded bg-muted px-1 py-0.5 text-sm font-mono'>
            {result}
          </code>
        );
        break;
      case 'strike':
        result = <s key={Math.random()}>{result}</s>;
        break;
      default:
        break;
    }
  }

  return result;
}

// Render a single node
function renderNode(node: TipTapNode, index: number): React.ReactNode {
  switch (node.type) {
    case 'text':
      return renderText(node as TipTapTextNode);

    case 'paragraph':
      return (
        <p key={index} className='mb-4 leading-7'>
          {node.content?.map((child, i) => renderNode(child, i)) || ''}
        </p>
      );

    case 'heading':
      const level = (node.attrs?.level as number) || 1;
      const headingClasses = {
        1: 'text-4xl font-bold mb-4 mt-6',
        2: 'text-3xl font-semibold mb-3 mt-5',
        3: 'text-2xl font-semibold mb-2 mt-4',
      };

      const props = {
        key: index,
        className: headingClasses[level as keyof typeof headingClasses],
        children: node.content?.map((child, i) => renderNode(child, i)) || '',
      };

      if (level === 1) return <h1 {...props} />;
      if (level === 2) return <h2 {...props} />;
      return <h3 {...props} />;

    case 'bulletList':
      return (
        <ul key={index} className='mb-4 ml-6 list-disc space-y-1'>
          {node.content?.map((child, i) => renderNode(child, i))}
        </ul>
      );

    case 'orderedList':
      return (
        <ol key={index} className='mb-4 ml-6 list-decimal space-y-1'>
          {node.content?.map((child, i) => renderNode(child, i))}
        </ol>
      );

    case 'listItem':
      return (
        <li key={index} className='leading-7'>
          {node.content?.map((child, i) => renderNode(child, i)) || ''}
        </li>
      );

    case 'codeBlock':
      const language = (node.attrs?.language as string) || '';
      return (
        <pre key={index} className='mb-4 rounded-lg bg-muted p-4 overflow-x-auto'>
          <code className='text-sm font-mono'>
            {node.content?.map((child, i) => renderNode(child, i)) || ''}
          </code>
        </pre>
      );

    case 'hardBreak':
      return <br key={index} />;

    case 'horizontalRule':
      return <hr key={index} className='my-6 border-border' />;

    case 'blockquote':
      return (
        <blockquote
          key={index}
          className='mb-4 border-l-4 border-primary pl-4 italic text-muted-foreground'
        >
          {node.content?.map((child, i) => renderNode(child, i)) || ''}
        </blockquote>
      );

    default:
      // Fallback for unknown node types
      return (
        <div key={index} className='mb-2 text-muted-foreground'>
          [Unknown node type: {node.type}]
        </div>
      );
  }
}

interface TipTapRendererProps {
  content: unknown;
}

export default function TipTapRenderer({ content }: TipTapRendererProps) {
  // Validate and parse content
  if (!content || typeof content !== 'object') {
    return <p className='text-muted-foreground'>No content available.</p>;
  }

  const doc = content as TipTapDoc;

  if (!doc.content || !Array.isArray(doc.content)) {
    return <p className='text-muted-foreground'>No content available.</p>;
  }

  return (
    <div className='prose prose-slate max-w-none dark:prose-invert'>
      {doc.content.map((node, index) => renderNode(node, index))}
    </div>
  );
}
