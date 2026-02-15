import initSqlJs, { Database as SqlJsDatabase } from 'sql.js';

const DB_PATH = process.env.DB_PATH || 'data/app.db';

let dbInstance: SqlJsDatabase | null = null;
let SQL: any = null;

// Export for testing
export let _testDbInstance: SqlJsDatabase | null = null;

async function initSql() {
	if (!SQL) {
		SQL = await initSqlJs();
	}
	return SQL;
}

// Sync wrapper that throws if not initialized
function getDbSync(): SqlJsDatabase {
	if (!dbInstance) {
		throw new Error('Database not initialized. Call initDb() first.');
	}
	return dbInstance;
}

// Async initialization
export async function initDb(): Promise<void> {
	if (!dbInstance) {
		const SQL = await initSql();
		const fs = await import('fs');
		try {
			const buffer = fs.readFileSync(DB_PATH);
			dbInstance = new SQL.Database(buffer);
		} catch (error) {
			// File doesn't exist, create new database
			dbInstance = new SQL.Database();
		}
		// Enable foreign keys
		dbInstance.run('PRAGMA foreign_keys = ON;');
		initializeTables(dbInstance);
		_testDbInstance = dbInstance;
	}
}

// Table initialization SQL - exported for testing
export const getTablesSQL = () => `
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
`;

function initializeTables(database: SqlJsDatabase): void {
	database.run(getTablesSQL());
}

// Convert SQL.js result format to object array
export function convertSqlJsResult<T = unknown>(
	result: { columns: string[]; values: unknown[][] }[],
): T[] {
	if (result.length === 0) return [];

	const columns = result[0].columns;
	const values = result[0].values;

	return values.map((row: unknown[]) => {
		const obj: any = {};
		columns.forEach((col: string, i: number) => {
			obj[col] = row[i];
		});
		return obj as T;
	});
}

// Convert a single row result to object
export function convertSqlJsRow<T = unknown>(
	result: { columns: string[]; values: unknown[][] }[],
): T | undefined {
	if (result.length === 0 || result[0].values.length === 0) return undefined;

	const columns = result[0].columns;
	const row = result[0].values[0];
	const obj: any = {};
	columns.forEach((col: string, i: number) => {
		obj[col] = row[i];
	});
	return obj as T;
}

async function saveDb(): Promise<void> {
	if (dbInstance) {
		const fs = await import('fs');
		const data = dbInstance.export();
		const buffer = Buffer.from(data);
		fs.writeFileSync(DB_PATH, buffer);
	}
}

// Sync wrapper for better-auth compatibility
export function getDb(): SqlJsDatabase {
	return getDbSync();
}

export function query<T = unknown>(sql: string, params?: unknown[]): T[] {
	const database = getDbSync();
	const results = database.exec(sql, params);
	return convertSqlJsResult<T>(results);
}

export function get<T = unknown>(sql: string, params?: unknown[]): T | undefined {
	const database = getDbSync();
	const results = database.exec(sql, params);
	return convertSqlJsRow<T>(results);
}

export function run(sql: string, params?: unknown[]): void {
	const database = getDbSync();
	database.run(sql, params);
	// Save asynchronously, don't wait
	saveDb().catch(console.error);
}

// Reset database - for testing only
export function _resetDb(): void {
	dbInstance = null;
	_testDbInstance = null;
}
