import { hooks } from '@/app/hooks/data';
import HookCard from '@/components/hook-card';

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-50 font-sans dark:bg-black">
      <header className="border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
              HookHub
            </h1>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Discover Claude Hooks
            </p>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <section className="mb-12 text-center">
          <h2 className="mb-4 text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Discover Claude Hooks
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">
            Explore the MCP (Model Context Protocol) ecosystem with community-built hooks that connect Claude to GitHub, databases, filesystems, and 200+ other tools.
          </p>
        </section>

        <section className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {hooks.map((hook) => (
            <HookCard key={hook.id} hook={hook} />
          ))}
        </section>
      </main>

      <footer className="border-t border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              HookHub - Built with Next.js and Tailwind CSS
            </p>
            <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-500">
              Part of the Model Context Protocol (MCP) ecosystem
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
