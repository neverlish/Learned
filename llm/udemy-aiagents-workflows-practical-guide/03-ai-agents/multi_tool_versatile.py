import json
import sqlite3
from datetime import datetime, timedelta
from typing import List

# Run "uv sync" to install the below packages
from dotenv import load_dotenv
from openai import OpenAI

from database import create_db_and_tables

load_dotenv()

client = OpenAI()

DB_FILE = "dummy_database.db"
create_db_and_tables()


def verify_customer(name: str, pin: str) -> int:
    """
    Verifies a customer's identity using their name and PIN.
    Returns the customer ID if verified, or -1 if not found.
    """
    conn = sqlite3.connect(DB_FILE)
    cursor = conn.cursor()
    first_name, last_name = name.lower().split()
    cursor.execute(
        "SELECT id FROM customers WHERE LOWER(first_name) = ? AND LOWER(last_name) = ? AND pin = ?",
        (first_name, last_name, pin),
    )
    result = cursor.fetchone()
    conn.close()
    if result:
        return result[0]
    return -1


def get_orders(customer_id: int) -> List[dict]:
    """
    Retrieves the order history for a given customer.
    """
    conn = sqlite3.connect(DB_FILE)
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()
    cursor.execute(
        "SELECT * FROM orders WHERE customer_id = ?", (customer_id,))
    orders = [dict(row) for row in cursor.fetchall()]
    conn.close()
    return orders


def check_refund_eligibility(customer_id: int, order_id: int) -> bool:
    """
    Checks if an order is eligible for a refund.
    An order is eligible if it was placed within the last 30 days.
    """
    conn = sqlite3.connect(DB_FILE)
    cursor = conn.cursor()
    cursor.execute(
        "SELECT date FROM orders WHERE id = ? AND customer_id = ?", (
            order_id, customer_id)
    )
    result = cursor.fetchone()
    conn.close()
    if not result:
        return False
    order_date = datetime.fromisoformat(result[0])
    return (datetime.now() - order_date).days <= 30


def issue_refund(customer_id: int, order_id: int) -> bool:
    """
    Issues a refund for an order.
    """
    # in reality, this would be stored in some database
    print(f"Refund issued for order {order_id} for customer {customer_id}")
    return True


def share_feedback(customer_id: int, feedback: str) -> str:
    """
    Allows a customer to share feedback.
    """
    # in reality, this would be stored in some database
    print(f"Feedback received from customer {customer_id}: {feedback}")
    return "Thank you for your feedback!"


available_functions = {
    "verify_customer": verify_customer,
    "get_orders": get_orders,
    "check_refund_eligibility": check_refund_eligibility,
    "issue_refund": issue_refund,
    "share_feedback": share_feedback,
}

tools = [
    {
        "type": "function",
        "name": "verify_customer",
        "description": "Verifies a customer's identity using their full name and PIN.",
        "parameters": {
            "type": "object",
            "properties": {
                "name": {
                    "type": "string",
                    "description": "The customer's full name, e.g., 'John Doe'.",
                },
                "pin": {"type": "string", "description": "The customer's PIN."},
            },
            "additionalProperties": False,
            "required": ["name", "pin"],
        },
    },
    {
        "type": "function",
        "name": "get_orders",
        "description": "Retrieves the order history for a verified customer.",
        "parameters": {
            "type": "object",
            "properties": {
                "customer_id": {
                    "type": "integer",
                    "description": "The customer's unique ID.",
                }
            },
            "additionalProperties": False,
            "required": ["customer_id"],
        },
    },
    {
        "type": "function",
        "name": "check_refund_eligibility",
        "description": "Checks if an order is eligible for a refund based on the order date.",
        "parameters": {
            "type": "object",
            "properties": {
                "customer_id": {
                    "type": "integer",
                    "description": "The customer's unique ID.",
                },
                "order_id": {
                    "type": "integer",
                    "description": "The unique ID of the order.",
                },
            },
            "additionalProperties": False,
            "required": ["customer_id", "order_id"],
        },
    },
    {
        "type": "function",
        "name": "issue_refund",
        "description": "Issues a refund for an order.",
        "parameters": {
            "type": "object",
            "properties": {
                "customer_id": {
                    "type": "integer",
                    "description": "The customer's unique ID.",
                },
                "order_id": {
                    "type": "integer",
                    "description": "The unique ID of the order.",
                },
            },
            "additionalProperties": False,
            "required": ["customer_id", "order_id"],
        },
    },
    {
        "type": "function",
        "name": "share_feedback",
        "description": "Allows a customer to provide feedback about their experience.",
        "parameters": {
            "type": "object",
            "properties": {
                "customer_id": {
                    "type": "integer",
                    "description": "The customer's unique ID.",
                },
                "feedback": {
                    "type": "string",
                    "description": "The feedback text from the customer.",
                },
            },
            "additionalProperties": False,
            "required": ["customer_id", "feedback"],
        },
    },
]


def execute_tool_call(tool_call) -> str:
    """
    Executes a tool call and returns the output.
    """
    fn_name = tool_call.name
    fn_args = json.loads(tool_call.arguments)

    if fn_name in available_functions:
        function_to_call = available_functions[fn_name]
        try:
            print(f"Calling {fn_name} with arguments: {fn_args}")
            # The return value of the function is converted to a string to be compatible with the API.
            return str(function_to_call(**fn_args))
        except Exception as e:
            return f"Error calling {fn_name}: {e}"

    return f"Unknown tool: {fn_name}"


def main():
    messages = [
        {
            "role": "developer",
            "content": """
                You are a friendly and helpful customer service agent. 
                You must ALWAYS verify the customer's identity before providing any sensitive information. 
                You MUST NOT expose any information to unverified customers.
                You MUST NOT provide any information that is not related to the customer's question.
                DON'T guess any information - neither customer nor order related (or anything else).
                If you can't perform a certain customer or order-related task, you must direct the user to a human agent.
                Ask for confirmation before performing any key actions.
                If you can't help a customer or if a customer is asking for something that is not related to the customer service, you MUST say "I'm sorry, I can't help with that."
            """}
    ]

    print("Welcome to the customer service chatbot! How can we help you today? Please type 'exit' to end the conversation.")
    while True:
        user_input = input(
            "Your input: ")
        if user_input == "exit":
            break

        messages.append({"role": "user", "content": user_input})

        for _ in range(5):  # limit tool call / assistant cycles to prevent infinite loops
            response = client.responses.create(
                model='gpt-4o',
                input=messages,
                tools=tools,
            )

            output = response.output

            for reply in output:
                messages.append(reply)

                if reply.type != "function_call":
                    print(reply.content[0].text)
                else:
                    tool_output = execute_tool_call(reply)
                    messages.append({
                        "type": "function_call_output",
                        "call_id": reply.call_id,
                        "output": str(tool_output),
                    })

            if not isinstance(messages[-1], dict) and messages[-1].type == "message":
                break


if __name__ == "__main__":
    main()