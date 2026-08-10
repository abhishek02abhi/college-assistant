import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(
    title="AI-Powered Autonomous College Assistant API",
    description="FastAPI Backend for RAG Retrieval, LangChain Autonomous Agent, Student Auth & RBAC.",
    version="1.1.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000", "*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def health_check():
    """Root endpoint to verify backend server status."""
    return {
        "status": "online",
        "service": "AI College Assistant API",
        "docs_url": "http://localhost:8000/docs",
    }

@app.get("/health")
def api_health():
    return {"status": "healthy"}

try:
    from app.api.v1.endpoints import chat, student, documents, auth
    app.include_router(auth.router, prefix="/api/v1")
    app.include_router(chat.router, prefix="/api/v1")
    app.include_router(student.router, prefix="/api/v1")
    app.include_router(documents.router, prefix="/api/v1")
except ImportError as e:
    print(f"Notice: Endpoint router import warning: {e}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)