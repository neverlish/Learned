import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function NotePage({ params }: { params: { id: string } }) {
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	if (!session) {
		redirect("/auth?mode=login");
	}

	return (
		<div className="flex min-h-screen items-center justify-center">
			<main className="text-center">
				<h1 className="text-4xl font-bold">Note Editor</h1>
				<p className="mt-4 text-muted-foreground">Note ID: {params.id}</p>
				<p className="text-sm text-muted-foreground">TipTap editor + Title field + Share toggle + Delete button</p>
			</main>
		</div>
	);
}
