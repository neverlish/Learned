import json

# Run "uv sync" to install the below packages
from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()

client = OpenAI()


def get_temperature(city: str) -> float:
    """
    Get the current temperature for a given city.
    """
    print("Fetching temperature for:", city)
    return 20.0


available_functions = {
    "get_temperature": get_temperature,
}

tools = [
    {
        "type": "function",
        "name": "get_temperature",
        "description": "Get current temperature for a given location.",
        "parameters": {
                "type": "object",
                "properties": {
                    "city": {
                        "type": "string",
                        "description": "City for which to get the temperature."
                    }
                },
            "additionalProperties": False,
            "required": ["city"],
        }

    }
]


def execute_tool_call(tool_call) -> str | float:
    """
    Executes a tool call and returns the output.
    """
    fn_name = tool_call.name
    fn_args = json.loads(tool_call.arguments)

    if fn_name in available_functions:
        function_to_call = available_functions[fn_name]
        try:
            return function_to_call(**fn_args)
        except Exception as e:
            return f"Error calling {fn_name}: {e}"

    return f"Unknown tool: {fn_name}"


def main():
    messages = [
        {"role": "developer", "content": "You are a helpful assistant. Answer the user's question in a friendly way."}
    ]

    while True:
        user_input = input("Your question (type 'exit' to end the conversation): ")
        if user_input == "exit":
            break

        messages.append({"role": "user", "content": user_input})
        response = client.responses.create(
            model='gpt-4o',
            input=messages,
            tools=tools,
        )

        output = response.output[0]
        messages.append(output) # add to chat history to keep track of the conversation

        if output.type != "function_call":
            print(response.output_text)
            continue

        tool_output = execute_tool_call(output)
        messages.append({
            "type": "function_call_output",
            "call_id": output.call_id,
            "output": str(tool_output),
        })

        response = client.responses.create(
            model='gpt-4o',
            input=messages,
        )
        print(response.output_text)
    
    print(messages)


if __name__ == "__main__":
    main()