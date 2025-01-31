from fastapi import FastAPI, Body
from pydantic import BaseModel
from ch2.inference import inference_json
from ch3.inference import inference_function_calling

app = FastAPI()

class RequestBody(BaseModel):
    review: str

@app.post("/evaluate/")
async def evaluate_review(body: RequestBody = Body()):
    return inference_json(body.review)

@app.post("/extract/")
async def extract_review(body: RequestBody = Body()):
    return inference_function_calling(body.review)