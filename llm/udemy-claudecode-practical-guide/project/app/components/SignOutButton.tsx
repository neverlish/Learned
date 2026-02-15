"use client";

import { signOut } from "@/lib/auth-client";

export default function SignOutButton() {
	const handleSignOut = async () => {
		await signOut({
			fetchOptions: {
				onSuccess: () => {
					window.location.href = "/";
				},
			},
		});
	};

	return (
		<button
			type="button"
			onClick={handleSignOut}
			className="text-sm font-medium text-muted-foreground hover:text-foreground"
		>
			Sign Out
		</button>
	);
}
