import { vi } from 'vitest';
import { expect } from 'vitest';

// Mock sql.js properly
vi.mock('sql.js', async () => {
	return {
		default: {
			Database: vi.fn().mockImplementation(() => ({
				exec: vi.fn(),
				run: vi.fn(),
				export: vi.fn(() => new Uint8Array()),
			})),
		},
	};
});

// Mock nanoid with both default and named export
const nanoidMock = vi.fn((length?: number) => {
	return 'test_' + Math.random().toString(36).substring(2, 2 + (length || 21));
});

vi.mock('nanoid', () => ({
	default: nanoidMock,
	nanoid: nanoidMock,
}));

// Mock fs
vi.mock('fs', () => ({
	default: {
		readFileSync: vi.fn(),
		writeFileSync: vi.fn(),
		existsSync: vi.fn(() => false),
	},
	readFileSync: vi.fn(),
	writeFileSync: vi.fn(),
	existsSync: vi.fn(() => false),
}));

// Mock better-auth to prevent db initialization
vi.mock('../../lib/auth', () => ({
	auth: {
		api: {
			getSession: vi.fn(),
		},
	},
}));

// Extend Vitest's expect with custom matchers if needed
interface CustomMatchers<R = unknown> {
	toBeValidNote: () => R;
}

declare module 'vitest' {
	interface Assertion<T = any> extends CustomMatchers<T> {}
}

beforeEach(() => {
	// Reset mocks before each test
	vi.clearAllMocks();
});
