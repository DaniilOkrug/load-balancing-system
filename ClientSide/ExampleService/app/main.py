from fastapi import FastAPI
from pydantic import BaseModel
import uvicorn
import socket


class TwoNumbers(BaseModel):
    a: int
    b: int


class OneNumber(BaseModel):
    n: int


def fibonacci_of(n):
    if n in {0, 1}:
        return n
    return fibonacci_of(n - 1) + fibonacci_of(n - 2)


app = FastAPI()


@app.get("/")
def greeting():
    return {"message": "Hello"}


@app.post("/sum")
async def sum(item: TwoNumbers):
    result = {"Sum of a and b": item.a + item.b}
    return result


@app.post("/division")
async def divide(item: TwoNumbers):
    result = {"Dividing a by b": item.a / item.b}
    return result


@app.post("/fibonacci")
async def fibonacci(item: OneNumber):
    result = {"Fibonacci of a": fibonacci_of(item.n)}
    return result


if __name__ == "__main__":
    hostname = socket.gethostname()
    ip = socket.gethostbyname(hostname)
    print(ip)
    #uvicorn.run(app, host="127.0.0.1", port=20500)
    uvicorn.run(app, host="0.0.0.0", port=20500)  # For Docker
