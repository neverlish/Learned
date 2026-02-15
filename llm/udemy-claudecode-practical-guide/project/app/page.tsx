import Link from 'next/link';

export default function Home() {
  return (
    <div className='flex min-h-screen items-center justify-center'>
      <main className='text-center'>
        <h1 className='text-4xl font-bold text-foreground'>Note Taking App</h1>
        <p className='mt-4 text-muted-foreground'>Your thoughts, organized.</p>
        <div className='mt-8 flex gap-4 justify-center'>
          <Link
            href='/auth?mode=login'
            className='rounded-md bg-primary px-6 py-2 font-medium text-primary-foreground hover:opacity-90'
          >
            Log In
          </Link>
          <Link
            href='/auth?mode=signup'
            className='rounded-md border border-border px-6 py-2 font-medium text-foreground hover:bg-muted'
          >
            Sign Up
          </Link>
        </div>
      </main>
    </div>
  );
}
