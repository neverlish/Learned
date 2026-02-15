import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import "./globals.css";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Note Taking App",
	description: "Your thoughts, organized.",
};

async function Header() {
	const session = await auth.api.getSession({
		headers: await headers(),
	});
	const isAuthenticated = !!session;

	return (
		<header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
			<div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
				<Link href="/" className="text-xl font-bold">
					NoteApp
				</Link>
				<nav className="flex items-center gap-4">
					{isAuthenticated ? (
						<>
							<Link
								href="/dashboard"
								className="text-sm font-medium text-foreground/80 hover:text-foreground"
							>
								Dashboard
							</Link>
							<form action="/api/auth/sign-out" method="POST">
								<button
									type="submit"
									className="text-sm font-medium text-foreground/80 hover:text-foreground"
								>
									Sign Out
								</button>
							</form>
						</>
					) : (
						<Link
							href="/auth?mode=login"
							className="text-sm font-medium text-foreground/80 hover:text-foreground"
						>
							Sign In
						</Link>
					)}
				</nav>
			</div>
		</header>
	);
}

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				<Header />
				{children}
			</body>
		</html>
	);
}
