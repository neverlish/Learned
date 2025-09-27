import os
from flask import Flask
import mysql.connector
import time

app = Flask(__name__)

# Database configuration
DB_CONFIG = {
    'host': os.getenv("MYSQL_HOST"),  # MySQL service name from docker-compose.yml
    'user': os.getenv("MYSQL_USER"),
    'password': os.getenv("MYSQL_PASSWORD"),
    'database': os.getenv("MYSQL_DATABASE"),
}

# Function to retry database connection
def connect_with_retry(retries=5, delay=2):
    for attempt in range(retries):
        try:
            connection = mysql.connector.connect(
                host=DB_CONFIG['host'],
                user=DB_CONFIG['user'],
                password=DB_CONFIG['password'],
            )
            print("Connected to the database!")
            return connection
        except mysql.connector.Error as e:
            print(f"Attempt {attempt + 1} failed: {e}")
            time.sleep(delay)
    raise Exception("Failed to connect to the database after multiple attempts.")

# Initialize the database and table
def initialize_database():
    try:
        connection = connect_with_retry()
        cursor = connection.cursor()
        cursor.execute(f"CREATE DATABASE IF NOT EXISTS {os.getenv('MYSQL_DATABASE')}")
        cursor.execute(f"USE {os.getenv('MYSQL_DATABASE')}")
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS messages (
                id INT AUTO_INCREMENT PRIMARY KEY,
                content VARCHAR(255) NOT NULL
            )
        """)
        connection.commit()
        print("Database and table initialized.")
    except Exception as e:
        print(f"Error initializing the database: {e}")
    finally:
        if 'connection' in locals() and connection:
            connection.close()

@app.route('/')
def home():
    try:
        connection = mysql.connector.connect(**DB_CONFIG)
        cursor = connection.cursor()

        # Insert a message into the table
        cursor.execute("INSERT INTO messages (content) VALUES ('Hello from MySQL!')")
        connection.commit()

        # Retrieve messages from the table
        cursor.execute("SELECT * FROM messages")
        rows = cursor.fetchall()
        return f"Messages in database: {rows}"
    except Exception as e:
        return f"Error interacting with the database: {e}"
    finally:
        if 'connection' in locals() and connection:
            connection.close()

if __name__ == "__main__":
    initialize_database()
    app.run(host='0.0.0.0', port=5000)
