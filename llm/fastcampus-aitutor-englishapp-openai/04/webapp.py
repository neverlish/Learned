from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import RedirectResponse

import shutil
from pydub import AudioSegment
import os
import uuid
import torchaudio
import torchaudio.transforms as T
from simpledecoder import SimpleConformerRNNT

from openai import OpenAI
client = OpenAI()


SSL_KEY_FILE_PATH="/home/wonkyum/fc-asr/secret/key.pem"
SSL_CERT_FILE_PATH="/home/wonkyum/fc-asr/secret/cert.pem"
MODEL_CHECKPOINT_PATH="/home/wonkyum/fc-asr/exp/checkpoints/epoch=12-step=185523.ckpt"
SP_MODEL_PATH="/home/wonkyum/fc-asr/spm_unigram_1023.model"
GMVN_STATS_PATH="/home/wonkyum/fc-asr/global_stats.json"

LLM_MODEL='gpt-4-turbo-preview'
messages=[]
messages.append({"role": "system", "content": "You are a helpful assistant."})

_expected_sample_rate = 16000
rnnt = None

app = FastAPI()
# Serve static files
app.mount("/static", StaticFiles(directory="static"), name="static")

# CORS middleware to allow requests from the web page
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def llm_request(messages):
    response = client.chat.completions.create(
        model = LLM_MODEL,
        messages = messages
        )
    return response.choices[0].message.content




def get_rnnt_model():
    global rnnt
    if rnnt is None:
        rnnt = SimpleConformerRNNT(ckpt_path=MODEL_CHECKPOINT_PATH, sp_model_path=SP_MODEL_PATH, gmvn_stats_path=GMVN_STATS_PATH)
        print("RNNT MODEL IS LOADED")
    return rnnt



@app.post("/upload/")
async def create_upload_file(file: UploadFile = File(...)):
    temp_file_path = uuid.uuid4().hex[:16]+".wav"
    with open(temp_file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    waveform, samplerate = torchaudio.load(temp_file_path)
    if samplerate != _expected_sample_rate:
        resampler = T.Resample(samplerate, _expected_sample_rate, dtype=waveform.dtype)
        waveform  = resampler(waveform)
    rnnt = get_rnnt_model()
    asr_output = rnnt.run_decoder(waveform)
    messages.append({"role": "user", "content": asr_output})
    llm_output = llm_request(messages)
    messages.append({"role": "assistant", "content": llm_output})


    return messages


# Redirect to the index.html page
@app.get("/")
async def root():
    return RedirectResponse(url='/static/index.html')

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8080,
        ssl_keyfile=SSL_KEY_FILE_PATH,
        ssl_certfile=SSL_CERT_FILE_PATH)

