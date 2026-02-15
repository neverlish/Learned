import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
	convertSqlJsResult,
	convertSqlJsRow,
	getTablesSQL,
	_resetDb,
} from '../../lib/db';

describe('Database Utilities', () => {
	describe('convertSqlJsResult', () => {
		it('should convert SQL.js result to array of objects', () => {
			const result = [
				{
					columns: ['id', 'name', 'email'],
					values: [
						['1', 'John Doe', 'john@example.com'],
						['2', 'Jane Smith', 'jane@example.com'],
					],
				},
			];

			const converted = convertSqlJsResult(result);

			expect(converted).toEqual([
				{ id: '1', name: 'John Doe', email: 'john@example.com' },
				{ id: '2', name: 'Jane Smith', email: 'jane@example.com' },
			]);
		});

		it('should return empty array for empty result', () => {
			const result: any[] = [];
			const converted = convertSqlJsResult(result);
			expect(converted).toEqual([]);
		});

		it('should handle null values correctly', () => {
			const result = [
				{
					columns: ['id', 'name', 'email'],
					values: [['1', 'John Doe', null]],
				},
			];

			const converted = convertSqlJsResult(result);
			expect(converted).toEqual([{ id: '1', name: 'John Doe', email: null }]);
		});
	});

	describe('convertSqlJsRow', () => {
		it('should convert SQL.js single row result to object', () => {
			const result = [
				{
					columns: ['id', 'name', 'email'],
					values: [['1', 'John Doe', 'john@example.com']],
				},
			];

			const converted = convertSqlJsRow(result);

			expect(converted).toEqual({
				id: '1',
				name: 'John Doe',
				email: 'john@example.com',
			});
		});

		it('should return undefined for empty result', () => {
			const result: any[] = [];
			const converted = convertSqlJsRow(result);
			expect(converted).toBeUndefined();
		});

		it('should return undefined for result with no values', () => {
			const result = [
				{
					columns: ['id', 'name', 'email'],
					values: [],
				},
			];

			const converted = convertSqlJsRow(result);
			expect(converted).toBeUndefined();
		});
	});

	describe('getTablesSQL', () => {
		it('should return SQL string with all required tables', () => {
			const sql = getTablesSQL();

			expect(sql).toContain('CREATE TABLE IF NOT EXISTS user');
			expect(sql).toContain('CREATE TABLE IF NOT EXISTS session');
			expect(sql).toContain('CREATE TABLE IF NOT EXISTS account');
			expect(sql).toContain('CREATE TABLE IF NOT EXISTS verification');
			expect(sql).toContain('CREATE TABLE IF NOT EXISTS notes');
		});

		it('should include all user table columns', () => {
			const sql = getTablesSQL();

			expect(sql).toContain('id TEXT PRIMARY KEY');
			expect(sql).toContain('name TEXT NOT NULL');
			expect(sql).toContain('email TEXT NOT NULL UNIQUE');
			expect(sql).toContain('emailVerified INTEGER NOT NULL DEFAULT 0');
			expect(sql).toContain('image TEXT');
			expect(sql).toContain('createdAt TEXT NOT NULL DEFAULT');
			expect(sql).toContain('updatedAt TEXT NOT NULL DEFAULT');
		});

		it('should include all notes table columns', () => {
			const sql = getTablesSQL();

			expect(sql).toContain('id TEXT PRIMARY KEY');
			expect(sql).toContain('user_id TEXT NOT NULL');
			expect(sql).toContain('title TEXT NOT NULL');
			expect(sql).toContain('content_json TEXT NOT NULL');
			expect(sql).toContain('is_public INTEGER NOT NULL DEFAULT 0');
			expect(sql).toContain('public_slug TEXT UNIQUE');
			expect(sql).toContain('created_at TEXT NOT NULL DEFAULT');
			expect(sql).toContain('updated_at TEXT NOT NULL DEFAULT');
		});

		it('should include indexes for notes table', () => {
			const sql = getTablesSQL();

			expect(sql).toContain('CREATE INDEX IF NOT EXISTS idx_notes_user_id');
			expect(sql).toContain('CREATE INDEX IF NOT EXISTS idx_notes_public_slug');
			expect(sql).toContain('CREATE INDEX IF NOT EXISTS idx_notes_is_public');
		});

		it('should include foreign key constraints', () => {
			const sql = getTablesSQL();

			expect(sql).toContain('FOREIGN KEY (userId) REFERENCES user(id)');
			expect(sql).toContain('FOREIGN KEY (user_id) REFERENCES user(id)');
		});
	});

	describe('_resetDb', () => {
		it('should reset database instance', () => {
			// This test just verifies the function exists and can be called
			expect(() => _resetDb()).not.toThrow();
		});
	});
});
