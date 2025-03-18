from fastapi import FastAPI
from domain import shipping, products, orders

app = FastAPI()


@app.get("/shipping/{orderNo}/{orderSeq}")
async def get_shipping(orderNo: int, orderSeq: int):
    return shipping[orderNo][orderSeq]


@app.get("/products/{productNo}")
async def get_product(productNo: int):
    return products[productNo]


@app.get("/orders/{orderNo}")
async def get_order(orderNo: int):
    return orders[orderNo]
