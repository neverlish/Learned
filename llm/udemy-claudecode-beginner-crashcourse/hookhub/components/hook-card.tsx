import { Hook } from '@/app/hooks/types';
import { categoryColors } from '@/app/hooks/data';

interface HookCardProps {
  hook: Hook;
}

export default function HookCard({ hook }: HookCardProps) {
  const categoryColorClass = categoryColors[hook.category] || 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';

  return (
    <article className="group flex flex-col rounded-lg border border-zinc-200 bg-white p-6 shadow-sm transition-all hover:scale-[1.02] hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900">
      <div className="mb-3 flex items-start justify-between gap-3">
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
          {hook.name}
        </h3>
        <span className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium ${categoryColorClass}`}>
          {hook.category}
        </span>
      </div>

      <p className="mb-4 flex-1 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
        {hook.description}
      </p>

      <a
        href={hook.repoUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-zinc-50 transition-colors hover:bg-zinc-700 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
      >
        <svg
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
          />
        </svg>
        View Repository
      </a>
    </article>
  );
}
