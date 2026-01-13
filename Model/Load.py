import json

from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_core.documents import Document
from langchain_ollama import OllamaEmbeddings
from langchain_qdrant import QdrantVectorStore
from qdrant_client import QdrantClient
from qdrant_client.models import VectorParams, Distance
from groq import Groq



QDRANT_URL =" "
QDRANT_API_KEY = ""
GROQ_API_KEY = ""


COLLECTION_NAME = ""

DATA_PATH = r""


def load_and_chunk():
    with open(DATA_PATH, "r", encoding="utf-8") as f:
        raw_json = json.load(f)

    all_texts = [page.get("text", "") for page in raw_json]

    unique = list(set(all_texts))
    filtered = [t for t in unique if len(t.strip()) > 80]

    remove_terms = [
        "Follow Along", "Latest Article", "Sun News Thinnai Program", "Read More", "About Us",
        "Privacy Policy", "Customer Feedback", "Terms and Conditions",
    ]

    cleaned = []
    for t in filtered:
        for rm in remove_terms:
            t = t.replace(rm, "")
        cleaned.append(t)

    splitter = RecursiveCharacterTextSplitter(
        chunk_size=800,
        chunk_overlap=100
    )

    chunks = []
    for text in cleaned:
        chunks.extend(splitter.split_text(text))

    print("Total Chunks Created:", len(chunks))

    return [Document(page_content=c) for c in chunks]



def upload_chunks(start, end):
    docs = load_and_chunk()

    embeddings = OllamaEmbeddings(model="nomic-embed-text")

    client = QdrantClient(url=QDRANT_URL, api_key=QDRANT_API_KEY)

    if not client.collection_exists(COLLECTION_NAME):
        client.create_collection(
            collection_name=COLLECTION_NAME,
            vectors_config=VectorParams(size=768, distance=Distance.COSINE)
        )
        print("Created NEW Qdrant Collection.")
    else:
        print("Collection already exists → Adding new docs.")

    qdrant = QdrantVectorStore(
        client=client,
        collection_name=COLLECTION_NAME,
        embedding=embeddings
    )

    batch = docs[start:end]
    print(f"\nUploading documents {start} → {end} (Total={len(batch)})\n")

    for i, doc in enumerate(batch):
        print(f"Uploading doc {i+1}/{len(batch)}...")
        qdrant.add_documents([doc])

    print("\n✅ Upload Completed!")



def chat_with_rag(question):
    embeddings = OllamaEmbeddings(model="nomic-embed-text")

    qdrant = QdrantVectorStore.from_existing_collection(
        embedding=embeddings,
        collection_name=COLLECTION_NAME,
        url=QDRANT_URL,
        api_key=QDRANT_API_KEY
    )

    results = qdrant.similarity_search(question, k=3)
    context = "\n\n".join([doc.page_content for doc in results])

    groq_client = Groq(api_key=GROQ_API_KEY)

    prompt = f"""
You are a knowledgeable restaurant assistant.
Use ONLY the context below to answer.

STRICT RULES:
- NEVER invent other cuisines like Mexican (tacos, fajitas), Italian (pizza, pasta), etc.
- If the answer is not found in the context, say:
  "I’m not fully sure about that from the data I have, but I can help you with our menu, biryani, outlets and general info."
- Keep answers short, clear and friendly.

Question:
{question}

Context:
{context}

Final Answer:
"""

    response = groq_client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[{"role": "user", "content": prompt}]
    )

    answer = response.choices[0].message.content
    print("\n AI Response:\n", answer)


print("\n========= RAG SYSTEM =========")
print("1. Upload a chunk batch")
print("2. Ask a question")
choice = input("Choose 1 or 2: ")

if choice == "1":
    s = int(input("Start index: "))
    e = int(input("End index: "))
    upload_chunks(s, e)

elif choice == "2":
    q = input("Ask your question: ")
    chat_with_rag(q)

else:
    print("Invalid choice.")
