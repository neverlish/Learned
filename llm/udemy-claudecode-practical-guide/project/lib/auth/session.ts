import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function getOptionalSession() {
	return await auth.api.getSession({
		headers: await headers(),
	});
}

export async function requireSession() {
	const session = await getOptionalSession();
	if (!session) {
		redirect("/auth?mode=login");
	}
	return session;
}
