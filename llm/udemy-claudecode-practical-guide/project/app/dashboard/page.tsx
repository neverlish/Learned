import { requireSession } from "@/lib/auth/session";

export default async function Dashboard() {
	const session = await requireSession();

	return (
		<div className="flex min-h-screen items-center justify-center">
			<main className="text-center">
				<h1 className="text-4xl font-bold text-foreground">Dashboard</h1>
				<p className="mt-4 text-muted-foreground">
					Welcome, {session.user.name}!
				</p>
				<p className="mt-2 text-muted-foreground">List of user notes + Create note button</p>
			</main>
		</div>
	);
}
