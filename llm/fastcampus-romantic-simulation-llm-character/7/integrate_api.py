from flask import Flask, request, jsonify, send_file
import requests
import os
import time
import torch
import torchaudio
from TTS.tts.configs.xtts_config import XttsConfig
from TTS.tts.models.xtts import Xtts
from TTS.tts.layers.xtts.tokenizer import Tokenizer
import urllib.parse

app = Flask(__name__)

# OpenAI API Settings
API_KEY = os.getenv("OPENAI_API_KEY")
ASSISTANT_ID = "asst_UHWGpegS06cbtXyjGmfXZe4a"
HEADERS = {
    "Content-Type": "application/json",
    "Authorization": f"Bearer {API_KEY}",
    "OpenAI-Beta": "assistants=v2",
}
BASE_URL = "https://api.openai.com/v1"
thread_id = None  # Thread ID storage


# Chat API Functionality
def get_assistant_response(message_content):
    global thread_id

    # Initialize or use existing thread
    if thread_id is None:
        response = requests.post(f"{BASE_URL}/threads", headers=HEADERS)
        response.raise_for_status()
        thread = response.json()
        thread_id = thread["id"]
    else:
        pass  # Reuse thread_id

    # Add message to thread
    data = {"role": "user", "content": message_content}
    response = requests.post(
        f"{BASE_URL}/threads/{thread_id}/messages", headers=HEADERS, json=data
    )
    response.raise_for_status()

    # Execute assistant response
    data = {"assistant_id": ASSISTANT_ID}
    response = requests.post(
        f"{BASE_URL}/threads/{thread_id}/runs", headers=HEADERS, json=data
    )
    response.raise_for_status()
    run_id = response.json()["id"]

    # Poll for completion
    while True:
        response = requests.get(
            f"{BASE_URL}/threads/{thread_id}/runs/{run_id}", headers=HEADERS
        )
        response.raise_for_status()
        if response.json()["status"] == "completed":
            break
        time.sleep(1)

    # Retrieve final assistant response
    response = requests.get(f"{BASE_URL}/threads/{thread_id}/messages", headers=HEADERS)
    response.raise_for_status()
    for msg in response.json()["data"]:
        if msg["role"] == "assistant":
            for content in msg["content"]:
                if content["type"] == "text":
                    return content["text"]["value"], content.get("choices", [])
    return "No response found.", []


# Chat Route
@app.route("/chat", methods=["POST"])
def chat():
    data = request.json
    message_content = data.get("message")
    if not message_content:
        return jsonify({"error": "No message content provided"}), 400
    response_text, choices = get_assistant_response(message_content)
    return jsonify({"response_text": response_text, "choices": choices})


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000)
