from fastapi import FastAPI, Body
from pydantic import BaseModel
from typing import List
from ch2.inference import inference_json
from ch3.inference import inference_function_calling
from ch4.inference import inference_langchain
from ch5.inference import inference_all_langchain

app = FastAPI()

class RequestBody(BaseModel):
    review: str

@app.post("/evaluate/")
async def evaluate_review(body: RequestBody = Body()):
    return inference_json(body.review)

@app.post("/extract/")
async def extract_review(body: RequestBody = Body()):
    return inference_function_calling(body.review)

class RequestBody2(BaseModel):
    reviews: List[str]

@app.post("/summary")
async def summary_reviews(body: RequestBody2 = Body()):
    return inference_langchain(body.reviews)

class Review(BaseModel):
    id: int
    document: str

class RequestBody3(BaseModel):
    reviews: List[Review]

@app.post("/analysis")
async def analysis_reviews(body: RequestBody3 = Body()):
    reviews = [review.dict() for review in body.reviews]
    return inference_all_langchain(reviews)