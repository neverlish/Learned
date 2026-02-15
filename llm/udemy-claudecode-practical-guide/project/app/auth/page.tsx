'use client';

import { useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth-client';
import { signInSchema, signUpSchema } from '@/lib/schemas';

export default function AuthPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const mode = searchParams.get('mode') || 'login';
  const isLogin = mode === 'login';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        // Validate input
        const result = signInSchema.safeParse({ email, password });
        if (!result.success) {
          setError(result.error.issues[0].message);
          return;
        }

        await authClient.signIn.email(
          { email, password, callbackURL: '/dashboard' },
          {
            onError: (ctx) => {
              // Sanitize error message - don't expose internal details
              setError('Invalid email or password');
            },
          },
        );
      } else {
        // Validate input
        const result = signUpSchema.safeParse({ email, password, name });
        if (!result.success) {
          setError(result.error.issues[0].message);
          return;
        }

        await authClient.signUp.email(
          { email, password, name, callbackURL: '/dashboard' },
          {
            onError: (ctx) => {
              // Sanitize error message - check for common errors
              const msg = ctx.error.message.toLowerCase();
              if (msg.includes('email') || msg.includes('user')) {
                setError('An account with this email already exists');
              } else {
                setError('Failed to create account. Please try again.');
              }
            },
          },
        );
      }
    } catch {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex min-h-screen items-center justify-center'>
      <main className='w-full max-w-md space-y-8 rounded-lg border border-border bg-card p-8 shadow-lg'>
        <div className='text-center'>
          <h1 className='text-2xl font-bold text-foreground'>
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h1>
          <p className='mt-2 text-muted-foreground'>
            {isLogin ? 'Sign in to your account' : 'Sign up to get started'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className='space-y-4'>
          {!isLogin && (
            <div>
              <label htmlFor='name' className='mb-1 block text-sm font-medium text-foreground'>
                Name
              </label>
              <input
                id='name'
                type='text'
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder='Your name'
                className='w-full rounded-md border border-input bg-background px-3 py-2 text-foreground'
                required
                maxLength={100}
              />
            </div>
          )}

          <div>
            <label htmlFor='email' className='mb-1 block text-sm font-medium text-foreground'>
              Email
            </label>
            <input
              id='email'
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='you@example.com'
              className='w-full rounded-md border border-input bg-background px-3 py-2 text-foreground'
              required
              autoComplete='email'
            />
          </div>

          <div>
            <label htmlFor='password' className='mb-1 block text-sm font-medium text-foreground'>
              Password
            </label>
            <input
              id='password'
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='••••••••'
              className='w-full rounded-md border border-input bg-background px-3 py-2 text-foreground'
              required
              minLength={8}
              autoComplete={isLogin ? 'current-password' : 'new-password'}
            />
          </div>

          {error && (
            <div className='rounded-md bg-destructive/10 p-3 text-sm text-destructive'>{error}</div>
          )}

          <button
            type='submit'
            disabled={loading}
            className='w-full rounded-md bg-primary px-4 py-2 font-medium text-primary-foreground disabled:opacity-50'
          >
            {loading ? 'Loading...' : isLogin ? 'Sign In' : 'Sign Up'}
          </button>
        </form>

        <div className='text-center text-sm'>
          <button
            type='button'
            onClick={() => router.push(isLogin ? '/auth?mode=signup' : '/auth?mode=login')}
            className='text-primary hover:underline'
          >
            {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
          </button>
        </div>
      </main>
    </div>
  );
}
