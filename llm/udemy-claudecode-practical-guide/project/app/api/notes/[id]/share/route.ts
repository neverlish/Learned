import { getAuthenticatedUser, unauthorized, badRequest, notFound } from "@/lib/api-helpers";
import { setNotePublic } from "@/lib/notes";
import { shareNoteSchema } from "@/lib/schemas";

interface RouteContext {
	params: Promise<{ id: string }>;
}

// POST /api/notes/[id]/share - Toggle public sharing
export async function POST(request: Request, context: RouteContext) {
	const user = await getAuthenticatedUser();
	if (!user) {
		return unauthorized();
	}

	const { id } = await context;

	try {
		const body = await request.json();

		// Validate input
		const result = shareNoteSchema.safeParse(body);
		if (!result.success) {
			return badRequest(result.error.errors[0].message);
		}

		const note = await setNotePublic(user.id, id, result.data.isPublic);

		if (!note) {
			return notFound("Note not found");
		}

		return Response.json({
			id: note.id,
			isPublic: note.is_public,
			publicSlug: note.public_slug,
		});
	} catch (error) {
		console.error("Error updating note sharing:", error);
		return Response.json(
			{ error: "Failed to update note sharing" },
			{ status: 500 },
		);
	}
}
