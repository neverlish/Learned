from dotenv import load_dotenv
import os

load_dotenv("./res/.env")

SLACK_BOT_TOKEN = os.getenv("SLACK_BOT_TOKEN")
SLACK_OAUTH_TOKEN = os.getenv("SLACK_OAUTH_TOKEN")

from slack import WebClient
from slack_bolt import App
from slack_bolt.adapter.socket_mode import SocketModeHandler
from anthropic import Anthropic

app = App(token=SLACK_BOT_TOKEN)

slack_client = WebClient(SLACK_OAUTH_TOKEN)
anthropic_client = Anthropic()


@app.event("app_mention")
def handle_message_events(body, logger):
    print(str(body["event"]["text"]).split(">")[1])
    prompt = str(body["event"]["text"]).split(">")[1]

    response = slack_client.chat_postMessage(
        channel=body["event"]["channel"],
        thread_ts=body["event"]["ts"],
        text="안녕하세요, 개인 비서 슬랙봇입니다! :robot_face: \n곧 전달 주신 문의사항 처리하겠습니다!",
    )

    response = anthropic_client.messages.create(
        model="claude-3-5-sonnet-20240620",
        max_tokens=1024,
        messages=[{"role": "user", "content": prompt}],
        temperature=0,
    )

    response = slack_client.chat_postMessage(
        channel=body["event"]["channel"],
        thread_ts=body["event"]["ts"],
        text=f"{response.content[0].text}",
    )


if __name__ == "__main__":
    SocketModeHandler(app, SLACK_BOT_TOKEN).start()
