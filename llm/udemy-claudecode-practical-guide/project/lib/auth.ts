import { betterAuth } from 'better-auth';
import { getDb, initDb } from './db';

// Initialize database before creating auth instance
let authInstance: ReturnType<typeof betterAuth> | null = null;

export async function getAuth() {
	if (!authInstance) {
		await initDb();
		authInstance = betterAuth({
			database: getDb(),
			emailAndPassword: {
				enabled: true,
				requireEmailVerification: false,
			},
		});
	}
	return authInstance;
}

// Synchronous export for compatibility (use with caution)
export const auth = await (async () => {
	await initDb();
	return betterAuth({
		database: getDb(),
		emailAndPassword: {
			enabled: true,
			requireEmailVerification: false,
		},
	});
})();
