import os
from dotenv import load_dotenv # type: ignore
from google import genai
from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware


load_dotenv()  # Load environment variables from .env file

api_key = os.getenv("GEMINI_API_KEY")
# Initialize the Gemini client
client = genai.Client(api_key=api_key)

class ChatRequest(BaseModel):
  prompt: str

app= FastAPI()

#Add CORS middleare
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

@app.post("/")
def ai_prompt(request: ChatRequest):
    response = client.models.generate_content(
        model="gemini-2.0-flash",  # o gemini-1.5-pro
        contents=request.prompt,
        config=genai.types.GenerateContentConfig(
            system_instruction="Eres un asistente amable y experto en programación."
        ),
    )
    return {"response": response.text}
  

