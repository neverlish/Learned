/// <reference types="vitest/globals" />

import { SqlJsDatabase } from 'sql.js';

// Global test utilities
declare global {
	var mockDb: {
		exec: ReturnType<typeof vi.fn>;
		run: ReturnType<typeof vi.fn>;
		export: ReturnType<typeof vi.fn>;
	};
	var mockNotes: any[];
	var mockUsers: any[];
}

export {};
