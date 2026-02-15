const DB_PATH = process.env.DB_PATH || "data/app.db";

let db: unknown;
let dbModule: any = null;

function getDbModule() {
	if (!dbModule) {
		dbModule = require("bun:sqlite");
	}
	return dbModule;
}

export function getDb(): unknown {
	if (!db) {
		const { Database } = getDbModule();
		db = new Database(DB_PATH);
		// Enable WAL mode for better concurrency
		(db as any).exec("PRAGMA journal_mode = WAL;");
		(db as any).exec("PRAGMA foreign_keys = ON;");
		initializeTables(db as any);
	}
	return db;
}

interface Database {
	exec(sql: string): void;
	prepare(sql: string): {
		all(...params: unknown[]): unknown[];
		get(...params: unknown[]): unknown | undefined;
		run(...params: unknown[]): void;
	};
}

function initializeTables(database: any): void {
	database.exec(`
		CREATE TABLE IF NOT EXISTS user (
			id TEXT PRIMARY KEY,
			name TEXT NOT NULL,
			email TEXT NOT NULL UNIQUE,
			emailVerified INTEGER NOT NULL DEFAULT 0,
			image TEXT,
			createdAt TEXT NOT NULL DEFAULT (datetime('now')),
			updatedAt TEXT NOT NULL DEFAULT (datetime('now'))
		);

		CREATE TABLE IF NOT EXISTS session (
			id TEXT PRIMARY KEY,
			userId TEXT NOT NULL,
			token TEXT NOT NULL UNIQUE,
			expiresAt TEXT NOT NULL,
			ipAddress TEXT,
			userAgent TEXT,
			createdAt TEXT NOT NULL DEFAULT (datetime('now')),
			updatedAt TEXT NOT NULL DEFAULT (datetime('now')),
			FOREIGN KEY (userId) REFERENCES user(id)
		);

		CREATE TABLE IF NOT EXISTS account (
			id TEXT PRIMARY KEY,
			userId TEXT NOT NULL,
			accountId TEXT NOT NULL,
			providerId TEXT NOT NULL,
			accessToken TEXT,
			refreshToken TEXT,
			accessTokenExpiresAt TEXT,
			refreshTokenExpiresAt TEXT,
			scope TEXT,
			idToken TEXT,
			password TEXT,
			createdAt TEXT NOT NULL DEFAULT (datetime('now')),
			updatedAt TEXT NOT NULL DEFAULT (datetime('now')),
			FOREIGN KEY (userId) REFERENCES user(id)
		);

		CREATE TABLE IF NOT EXISTS verification (
			id TEXT PRIMARY KEY,
			identifier TEXT NOT NULL,
			value TEXT NOT NULL,
			expiresAt TEXT NOT NULL,
			createdAt TEXT NOT NULL DEFAULT (datetime('now')),
			updatedAt TEXT NOT NULL DEFAULT (datetime('now'))
		);

		CREATE TABLE IF NOT EXISTS notes (
			id TEXT PRIMARY KEY,
			user_id TEXT NOT NULL,
			title TEXT NOT NULL,
			content_json TEXT NOT NULL,
			is_public INTEGER NOT NULL DEFAULT 0,
			public_slug TEXT UNIQUE,
			created_at TEXT NOT NULL DEFAULT (datetime('now')),
			updated_at TEXT NOT NULL DEFAULT (datetime('now')),
			FOREIGN KEY (user_id) REFERENCES user(id)
		);

		CREATE INDEX IF NOT EXISTS idx_notes_user_id ON notes(user_id);
		CREATE INDEX IF NOT EXISTS idx_notes_public_slug ON notes(public_slug);
		CREATE INDEX IF NOT EXISTS idx_notes_is_public ON notes(is_public);
	`);
}

export function query<T = unknown>(sql: string, params?: unknown[]): T[] {
	const database = getDb() as Database;
	const statement = database.prepare(sql);
	const results = statement.all(...(params || []));
	return results as T[];
}

export function get<T = unknown>(sql: string, params?: unknown[]): T | undefined {
	const database = getDb() as Database;
	const statement = database.prepare(sql);
	const result = statement.get(...(params || []));
	return result as T | undefined;
}

export function run(sql: string, params?: unknown[]): void {
	const database = getDb() as Database;
	const statement = database.prepare(sql);
	statement.run(...(params || []));
}
