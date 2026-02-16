import sqlite3
from datetime import datetime, timedelta

def create_db_and_tables():
    conn = sqlite3.connect("dummy_database.db")
    cursor = conn.cursor()

    cursor.execute("""
    CREATE TABLE IF NOT EXISTS customers (
        id INTEGER PRIMARY KEY,
        first_name TEXT NOT NULL,
        last_name TEXT NOT NULL,
        pin TEXT NOT NULL
    )
    """)

    cursor.execute("""
    CREATE TABLE IF NOT EXISTS orders (
        id INTEGER PRIMARY KEY,
        customer_id INTEGER NOT NULL,
        date TEXT NOT NULL,
        product_name TEXT NOT NULL,
        amount REAL NOT NULL,
        FOREIGN KEY (customer_id) REFERENCES customers (id)
    )
    """)

    cursor.execute("DELETE FROM orders")
    cursor.execute("DELETE FROM customers")

    customers = [
        ("John", "Doe", "1234"),
        ("Jane", "Smith", "5678")
    ]
    cursor.executemany("INSERT INTO customers (first_name, last_name, pin) VALUES (?, ?, ?)", customers)

    customer_ids = [row[0] for row in cursor.execute("SELECT id FROM customers")]
    orders = [
        (customer_ids[0], (datetime.now() - timedelta(days=10)).isoformat(), "Laptop", 1200.00),
        (customer_ids[0], (datetime.now() - timedelta(days=45)).isoformat(), "Mouse", 25.00),
        (customer_ids[1], (datetime.now() - timedelta(days=5)).isoformat(), "Keyboard", 75.00)
    ]
    cursor.executemany("INSERT INTO orders (customer_id, date, product_name, amount) VALUES (?, ?, ?, ?)", orders)

    conn.commit()
    conn.close()

if __name__ == "__main__":
    create_db_and_tables()
    print("Database created and populated successfully.")