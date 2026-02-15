import { auth } from "./auth";
import { headers } from "next/headers";

export async function getAuthenticatedUser() {
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	if (!session?.user) {
		return null;
	}

	return session.user;
}

export function unauthorized() {
	return Response.json(
		{ error: "Unauthorized" },
		{ status: 401, statusText: "Unauthorized" },
	);
}

export function badRequest(message: string) {
	return Response.json(
		{ error: message },
		{ status: 400, statusText: "Bad Request" },
	);
}

export function notFound(message: string = "Resource not found") {
	return Response.json(
		{ error: message },
		{ status: 404, statusText: "Not Found" },
	);
}

export function serverError(message: string = "Internal server error") {
	return Response.json(
		{ error: message },
		{ status: 500, statusText: "Internal Server Error" },
	);
}
