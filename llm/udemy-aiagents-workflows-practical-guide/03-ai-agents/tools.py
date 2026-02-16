import json
import sqlite3
from datetime import datetime
from typing import Dict, Any

# Run "uv sync" to install the below packages
from dotenv import load_dotenv
from openai import OpenAI

from database import create_db_and_tables

load_dotenv()

client = OpenAI()

DB_FILE = "dummy_database.db"
create_db_and_tables()


class Tool:
    """
    The base class for a tool that can be used by an agent.
    """

    def __init__(
        self,
        name: str,
        description: str,
        parameters: Dict[str, Any],
    ):
        self.name = name
        self.description = description
        self.parameters = parameters


    def get_schema(self) -> Dict[str, Any]:
        """
        Returns the schema for the tool.
        """
        return {
            "type": "function",
            "name": self.name,
            "description": self.description,
            "parameters": {
                "type": "object",
                "properties": self.parameters,
                "additionalProperties": False,
                "required": list(self.parameters.keys()),
            },
        }

    def execute(self, arguments: str) -> str:
        """
        Executes the tool's logic. This method must be implemented by subclasses.
        """
        raise NotImplementedError("Each tool must implement its own execute method.")


class VerifyCustomerTool(Tool):
    def __init__(self):
        super().__init__(
            name="verify_customer",
            description="Verifies a customer's identity using their full name and PIN.",
            parameters={
                "name": {
                    "type": "string",
                    "description": "The customer's full name, e.g., 'John Doe'.",
                },
                "pin": {"type": "string", "description": "The customer's PIN."},
            },
        )

    def execute(self, arguments: str) -> str:
        try:
            args = json.loads(arguments)
            conn = sqlite3.connect(DB_FILE)
            cursor = conn.cursor()
            first_name, last_name = args["name"].lower().split()
            cursor.execute(
                "SELECT id FROM customers WHERE LOWER(first_name) = ? AND LOWER(last_name) = ? AND pin = ?",
                (first_name, last_name, args["pin"]),
            )
            result = cursor.fetchone()
            conn.close()
            if result:
                return str(result[0])
            return str(-1)
        except Exception as e:
            return f"Error in {self.name}: {e}"


class GetOrdersTool(Tool):
    def __init__(self):
        super().__init__(
            name="get_orders",
            description="Retrieves the order history for a verified customer.",
            parameters={
                "customer_id": {
                    "type": "integer",
                    "description": "The customer's unique ID.",
                }
            },
        )

    def execute(self, arguments: str) -> str:
        try:
            args = json.loads(arguments)
            conn = sqlite3.connect(DB_FILE)
            conn.row_factory = sqlite3.Row
            cursor = conn.cursor()
            cursor.execute(
                "SELECT * FROM orders WHERE customer_id = ?", (args["customer_id"],)
            )
            orders = [dict(row) for row in cursor.fetchall()]
            conn.close()
            return json.dumps(orders)
        except Exception as e:
            return f"Error in {self.name}: {e}"


class CheckRefundEligibilityTool(Tool):
    def __init__(self):
        super().__init__(
            name="check_refund_eligibility",
            description="Checks if an order is eligible for a refund based on the order date.",
            parameters={
                "customer_id": {
                    "type": "integer",
                    "description": "The customer's unique ID.",
                },
                "order_id": {
                    "type": "integer",
                    "description": "The unique ID of the order.",
                },
            },
        )

    def execute(self, arguments: str) -> str:
        try:
            args = json.loads(arguments)
            conn = sqlite3.connect(DB_FILE)
            cursor = conn.cursor()
            cursor.execute(
                "SELECT date FROM orders WHERE id = ? AND customer_id = ?",
                (args["order_id"], args["customer_id"]),
            )
            result = cursor.fetchone()
            conn.close()
            if not result:
                return str(False)
            order_date = datetime.fromisoformat(result[0])
            return str((datetime.now() - order_date).days <= 30)
        except Exception as e:
            return f"Error in {self.name}: {e}"


class IssueRefundTool(Tool):
    def __init__(self):
        super().__init__(
            name="issue_refund",
            description="Issues a refund for an order.",
            parameters={
                "customer_id": {
                    "type": "integer",
                    "description": "The customer's unique ID.",
                },
                "order_id": {
                    "type": "integer",
                    "description": "The unique ID of the order.",
                },
            },
        )

    def execute(self, arguments: str) -> str:
        try:
            args = json.loads(arguments)
            # in reality, this would be stored in some database
            print(
                f"Refund issued for order {args['order_id']} for customer {args['customer_id']}"
            )
            return str(True)
        except Exception as e:
            return f"Error in {self.name}: {e}"


class ShareFeedbackTool(Tool):
    def __init__(self):
        super().__init__(
            name="share_feedback",
            description="Allows a customer to provide feedback about their experience.",
            parameters={
                "customer_id": {
                    "type": "integer",
                    "description": "The customer's unique ID.",
                },
                "feedback": {
                    "type": "string",
                    "description": "The feedback text from the customer.",
                },
            },
        )

    def execute(self, arguments: str) -> str:
        try:
            args = json.loads(arguments)
            # in reality, this would be stored in some database
            print(
                f"Feedback received from customer {args['customer_id']}: {args['feedback']}"
            )
            return "Thank you for your feedback!"
        except Exception as e:
            return f"Error in {self.name}: {e}"


class Agent:
    """
    The base class for an agent that can interact with the OpenAI API.
    """

    def __init__(self, model: str = "gpt-4o"):
        self.client = OpenAI()
        self.model = model
        self.messages: list[Dict[str, Any]] = []
        self.tools: Dict[str, Tool] = {}

    def register_tool(self, tool: Tool):
        """
        Registers a tool with the agent.
        """
        self.tools[tool.name] = tool

    def _get_tool_schemas(self) -> list[Dict[str, Any]]:
        """
        Returns the list of tool schemas.
        """
        return [tool.get_schema() for tool in self.tools.values()]

    def execute_tool_call(self, tool_call: Any) -> str:
        """
        Executes a tool call and returns the output.
        """
        fn_name = tool_call.name
        fn_args = json.loads(tool_call.arguments)

        if fn_name in self.tools:
            tool_to_call = self.tools[fn_name]
            try:
                print(f"Calling {fn_name} with arguments: {fn_args}")
                # The return value of the function is converted to a string to be compatible with the API.
                return str(tool_to_call.execute(tool_call))
            except Exception as e:
                return f"Error calling {fn_name}: {e}"

        return f"Unknown tool: {fn_name}"

    def run(self):
        """
        Runs the agent. This method should be implemented by subclasses.
        """
        raise NotImplementedError("The run method must be implemented by a subclass.")


class CustomerServiceAgent(Agent):
    """
    A customer service agent that extends the base Agent class.
    """
    
    def __init__(self, model="gpt-4o"):
        super().__init__(model)
        self._set_initial_prompt()
        self._register_all_tools()

    def _set_initial_prompt(self):
        self.messages = [
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
                """
            }
        ]

    def _register_all_tools(self):
        tools_to_register = [
            VerifyCustomerTool(),
            GetOrdersTool(),
            CheckRefundEligibilityTool(),
            IssueRefundTool(),
            ShareFeedbackTool(),
        ]

        for tool in tools_to_register:
            self.register_tool(tool)

    def run(self):
        """
        Runs the agent's main interaction loop.
        """
        print(
            "Welcome to the customer service chatbot! How can we help you today? Please type 'exit' to end the conversation."
        )
        while True:
            user_input = input("Your input: ")
            if user_input.lower() == "exit":
                break

            self.messages.append({"role": "user", "content": user_input})

            for _ in range(
                5
            ):  # limit tool call / assistant cycles to prevent infinite loops
                response = self.client.responses.create(
                    model=self.model,
                    input=self.messages,
                    tools=self._get_tool_schemas(),
                )

                output = response.output

                for reply in output:
                    self.messages.append(reply.model_dump())

                    if reply.type != "function_call":
                        print(reply.content[0].text)
                    else:
                        fn_name = reply.name
                        if fn_name in self.tools:
                            tool_to_call = self.tools[fn_name]
                            tool_output = tool_to_call.execute(reply.arguments)
                        else:
                            tool_output = f"Unknown tool: {fn_name}"

                        self.messages.append(
                            {
                                "type": "function_call_output",
                                "call_id": reply.call_id,
                                "output": tool_output,
                            }
                        )

                if self.messages[-1].get("type") == "message":
                    break


def main():
    agent = CustomerServiceAgent()
    agent.run()


if __name__ == "__main__":
    main()