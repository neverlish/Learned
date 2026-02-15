import os

import requests
from dotenv import load_dotenv

load_dotenv()

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

def generate_x_post(usr_input: str) -> str:
    payload = {
        "model": "gpt-4",
        "input": "..."
    }
    response = requests.post(
        "https://api.openai.com/v1/responses",
        json=payload,
        headers={
            "Content-Type": "application/json",
            "Authorization": f"Bearer {OPENAI_API_KEY}"
        }
    )

def main():
    print("Hello from essentials!")

    usr_input = input("What should the post be about?")
    x_post = generate_x_post(usr_input)
    print("Generated X post")
    print(x_post)


if __name__ == "__main__":
    main()
