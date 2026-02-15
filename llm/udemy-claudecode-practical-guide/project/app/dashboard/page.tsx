import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function Dashboard() {
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	if (!session) {
		redirect("/auth?mode=login");
	}

	return (
		<div className="flex min-h-screen items-center justify-center">
			<main className="text-center">
				<h1 className="text-4xl font-bold">Dashboard</h1>
				<p className="mt-4 text-muted-foreground">
					Welcome, {session.user.name}!
				</p>
				<p className="mt-2 text-muted-foreground">List of user notes + Create note button</p>
			</main>
		</div>
	);
}
