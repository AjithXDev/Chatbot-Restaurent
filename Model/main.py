
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from groq import Groq
from langchain_ollama import OllamaEmbeddings
from langchain_qdrant import QdrantVectorStore
from qdrant_client import QdrantClient, models


QDRANT_URL ="" 
QDRANT_API_KEY = ""
GROQ_API_KEY = ""
COLLECTION_NAME = ""


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class UserQuery(BaseModel):
    message: str

embeddings = OllamaEmbeddings(model="nomic-embed-text")


vector_store = QdrantVectorStore.from_existing_collection(
    embedding=embeddings,
    collection_name=COLLECTION_NAME,
    url=QDRANT_URL,
    api_key=QDRANT_API_KEY,
)


groq_client = Groq(api_key=GROQ_API_KEY)

@app.post("/chat")
async def chat(data: UserQuery):
    user_q = data.message

    
    results = vector_store.similarity_search(user_q, k=3)
    context = "\n\n".join([doc.page_content for doc in results])

    
    prompt = f"""
You are a restaurant assistant.
Use the food/menu details from the context to answer user questions.

STRICT RULES:
- Always speak as Thalappakatti restaurant assistant.
- Talk only about Dindigul Thalappakatti, its biryani, dishes, outlets, offers, policies, etc.
- NEVER invent other cuisines like Mexican (tacos, fajitas), Italian (pizza, pasta), etc.
- If the answer is not found in the context, say:
  "I’m not fully sure about that from the data I have, but I can help you with our menu, biryani, outlets and general info."
- Keep answers short, clear and friendly.

QUESTION:
{user_q}

CONTEXT:
{context}

ANSWER:
"""

    resp = groq_client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[{"role": "user", "content": prompt}],
    )

    answer = resp.choices[0].message.content
    return {"reply": answer}
