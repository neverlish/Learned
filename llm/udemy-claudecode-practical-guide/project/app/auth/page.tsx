"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function AuthPage() {
	const searchParams = useSearchParams();
	const router = useRouter();
	const mode = searchParams.get("mode") || "login";
	const isLogin = mode === "login";

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [name, setName] = useState("");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError("");
		setLoading(true);

		try {
			if (isLogin) {
				await authClient.signIn.email(
					{ email, password, callbackURL: "/dashboard" },
					{
						onError: (ctx) => {
							setError(ctx.error.message);
						},
					},
				);
			} else {
				await authClient.signUp.email(
					{ email, password, name, callbackURL: "/dashboard" },
					{
						onError: (ctx) => {
							setError(ctx.error.message);
						},
					},
				);
			}
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="flex min-h-screen items-center justify-center">
			<main className="w-full max-w-md space-y-8 rounded-lg border bg-card p-8 shadow-lg">
				<div className="text-center">
					<h1 className="text-2xl font-bold">{isLogin ? "Welcome Back" : "Create Account"}</h1>
					<p className="mt-2 text-muted-foreground">
						{isLogin ? "Sign in to your account" : "Sign up to get started"}
					</p>
				</div>

				<form onSubmit={handleSubmit} className="space-y-4">
					{!isLogin && (
						<div>
							<label htmlFor="name" className="mb-1 block text-sm font-medium">
								Name
							</label>
							<input
								id="name"
								type="text"
								value={name}
								onChange={(e) => setName(e.target.value)}
								placeholder="Your name"
								className="w-full rounded-md border border-input bg-background px-3 py-2 text-foreground"
								required
							/>
						</div>
					)}

					<div>
						<label htmlFor="email" className="mb-1 block text-sm font-medium">
							Email
						</label>
						<input
							id="email"
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							placeholder="you@example.com"
							className="w-full rounded-md border border-input bg-background px-3 py-2 text-foreground"
							required
						/>
					</div>

					<div>
						<label htmlFor="password" className="mb-1 block text-sm font-medium">
							Password
						</label>
						<input
							id="password"
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							placeholder="••••••••"
							className="w-full rounded-md border border-input bg-background px-3 py-2 text-foreground"
							required
							minLength={8}
						/>
					</div>

					{error && (
						<div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
							{error}
						</div>
					)}

					<button
						type="submit"
						disabled={loading}
						className="w-full rounded-md bg-primary px-4 py-2 font-medium text-primary-foreground disabled:opacity-50"
					>
						{loading ? "Loading..." : isLogin ? "Sign In" : "Sign Up"}
					</button>
				</form>

				<div className="text-center text-sm">
					<button
						type="button"
						onClick={() => router.push(isLogin ? "/auth?mode=signup" : "/auth?mode=login")}
						className="text-primary hover:underline"
					>
						{isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
					</button>
				</div>
			</main>
		</div>
	);
}
