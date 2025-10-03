from fastapi import FastAPI
from pydantic import BaseModel

class ChatRequest(BaseModel):
  prompt: str

app= FastAPI()

@app.get("/")
def welcome(prompt: str = "Hello, World!"):
  return {"message": prompt}

@app.post("/prompt")
def  ai_prompt(request: ChatRequest):
  return {"Your prompt is": request.prompt}