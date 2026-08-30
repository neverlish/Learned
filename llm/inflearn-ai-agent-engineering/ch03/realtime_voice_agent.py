
import asyncio
import base64
import json
import os

import websockets
from fastapi import FastAPI, WebSocket
from starlette.websockets import WebSocketDisconnect

try:
    from dotenv import load_dotenv
    load_dotenv()
except ImportError:
    pass  

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
if not OPENAI_API_KEY:
    raise ValueError(
        "OPENAI_API_KEY가 설정되지 않았습니다. "
        "환경변수 또는 .env 파일에서 설정해주세요."
    )

MODEL          = "gpt-realtime-mini"
VOICE          = "coral"
PCM_SR         = 24000
PORT           = 5050

app = FastAPI()

@app.websocket("/voice")
async def voice_bridge(ws: WebSocket) -> None:
    """
    1. 브라우저가 ws://host:5050/voice로 WebSocket 연결
    2. OpenAI Realtime API (wss://api.openai.com/v1/realtime)에 연결 및 세션 초기화
    3. from_client(): 브라우저 → OpenAI로 PCM16 오디오 스트리밍 (input_audio_buffer.append)
    4. to_client(): OpenAI → 브라우저로 어시스턴트 음성 델타 전달 (response.output_audio.delta)
    5. 인터럽션 처리: 사용자 발화 감지 시 어시스턴트 응답 즉시 중단 (conversation.item.truncate)
    """
    await ws.accept()

    # OpenAI Realtime API에 하위 연결 생성
    openai_ws = await websockets.connect(
        f"wss://api.openai.com/v1/realtime?model={MODEL}",
        additional_headers={
            "Authorization": f"Bearer {OPENAI_API_KEY}",
        },
        max_size=None, max_queue=None # 데모 단순화를 위해 무제한 설정
    )

    # Realtime 세션 초기화
    await openai_ws.send(json.dumps({
        "type": "session.update",
        "session": {
            "type": "realtime",
            "model": MODEL,
            "output_modalities": ["audio"],
            "audio": {
                "input": {
                    "format": {
                        "type": "audio/pcm",
                        "rate": PCM_SR,
                    },
                    "turn_detection": {"type": "server_vad"},
                },
                "output": {
                    "format": {
                        "type": "audio/pcm",
                        "rate": PCM_SR,
                    },
                    "voice": VOICE,
                },
            },
            "instructions": "당신은 간결한 AI 에이전트입니다. 한국어로 대답하세요. 최대한 예의 있는 말투로 대답하세요. 최대한 짧게 대답하세요."
        }
    }))

    last_assistant_item = None          # 현재 어시스턴트 응답 추적
    latest_pcm_ts       = 0             # 클라이언트로부터의 ms 타임스탬프
    pending_marks       = []

    async def from_client() -> None:
        """브라우저에서 OpenAI로 마이크 PCM 청크를 중계"""
        nonlocal latest_pcm_ts
        async for msg in ws.iter_text():
            data = json.loads(msg)
            pcm = base64.b64decode(data["audio"])
            latest_pcm_ts += int(len(pcm) / (PCM_SR * 2) * 1000)  # 단순 ms 카운터
            await openai_ws.send(json.dumps({
                "type": "input_audio_buffer.append",
                "audio": base64.b64encode(pcm).decode("ascii")
            }))

    async def to_client() -> None:
        """어시스턴트 오디오 중계 및 인터럽션 처리"""
        nonlocal last_assistant_item, pending_marks
        async for raw in openai_ws:
            msg = json.loads(raw)

            # 어시스턴트가 말하는 경우
            if msg["type"] == "response.output_audio.delta":
                pcm = base64.b64decode(msg["delta"])
                await ws.send_json({"audio": base64.b64encode(pcm).decode("ascii")})
                last_assistant_item = msg.get("item_id")

            if msg["type"] == "error":
                error = msg.get("error", {})
                message = error.get("message", "OpenAI Realtime API 오류")
                print(f"OpenAI Realtime API 오류: {message}")
                await ws.send_json({"error": message})

            # 사용자가 말하기 시작 → 어시스턴트 발화 중단
            if msg["type"] == "input_audio_buffer.speech_started" and last_assistant_item:
                await openai_ws.send(json.dumps({
                    "type": "conversation.item.truncate",
                    "item_id": last_assistant_item,
                    "content_index": 0,
                    "audio_end_ms": 0   # 즉시 중단
                }))
                last_assistant_item = None
                pending_marks.clear()

    try:
        await asyncio.gather(from_client(), to_client())
    except (WebSocketDisconnect, websockets.ConnectionClosed):
        pass
    finally:
        await openai_ws.close()
        try:
            await ws.close()
        except RuntimeError:
            pass

if __name__ == "__main__":
    import uvicorn
    print("\n" + "="*60)
    print(f"\n실시간 음성 에이전트 서버가 시작됩니다...")
    print(f"\n서버가 실행되면 브라우저에서 index.html 파일을 열어주세요!")
    print(f"\n파일 위치: ch03/index.html")
    print("="*60 + "\n")
    uvicorn.run("realtime_voice_agent:app", host="0.0.0.0", port=PORT)
