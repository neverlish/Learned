import sqlite3
from typing import List, Dict, Any

DB_FILE = "research.db"

def get_db_connection():
    conn = sqlite3.connect(DB_FILE)
    conn.row_factory = sqlite3.Row
    return conn

def create_research_plans_table():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS research_plans (
        id INTEGER PRIMARY KEY,
        short_summary TEXT NOT NULL,
        details TEXT NOT NULL
    )
    """)
    conn.commit()
    conn.close()

def get_research_plans() -> List[Dict[str, Any]]:
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM research_plans")
    research_plans = [dict(row) for row in cursor.fetchall()]
    conn.close()
    return research_plans

def add_research_plan(short_summary: str, details: str) -> Dict[str, Any]:
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("INSERT INTO research_plans (short_summary, details) VALUES (?, ?)", (short_summary, details))
    research_plan_id = cursor.lastrowid
    conn.commit()
    conn.close()
    return {"id": research_plan_id, "short_summary": short_summary, "details": details}

def delete_research_plan(research_plan_id: int):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM research_plans WHERE id = ?", (research_plan_id,))
    conn.commit()
    conn.close() 


def init_db():
    create_research_plans_table()