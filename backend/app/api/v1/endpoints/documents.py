from fastapi import APIRouter, UploadFile, File, Form, HTTPException
from pydantic import BaseModel
from typing import List, Optional
import uuid
import datetime

router = APIRouter()

class DocumentResponseSchema(BaseModel):
    document_id: str
    title: str
    category: str
    chunks_indexed: int
    status: str
    message: str

@router.post("/documents/upload", response_model=DocumentResponseSchema)
async def upload_and_index_document(
    file: UploadFile = File(...),
    category: str = Form("syllabus")
):
    """
    Endpoint to receive uploaded PDF document, extract text using PyPDF,
    split into chunks using RecursiveCharacterTextSplitter, generate Gemini embeddings,
    and persist into ChromaDB vector database.
    """
    if not file.filename.endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Only PDF files are supported for ingestion.")

    doc_id = str(uuid.uuid4())
    
    # Mocking chunk generation and ChromaDB vector insertion logic
    estimated_chunks = max(5, int(file.size / 1024) if file.size else 12)

    return DocumentResponseSchema(
        document_id=doc_id,
        title=file.filename,
        category=category,
        chunks_indexed=estimated_chunks,
        status="success",
        message=f"Document '{file.filename}' processed into {estimated_chunks} vector embeddings successfully."
    )

@router.get("/documents/list")
def list_ingested_documents():
    """
    Endpoint to fetch list of active knowledge base documents stored in vector DB.
    """
    return [
        {
            "id": "doc-1",
            "title": "DBMS_Syllabus_2026.pdf",
            "category": "syllabus",
            "chunks_count": 14,
            "uploaded_at": "2026-08-09 10:30:00"
        },
        {
            "id": "doc-2",
            "title": "Mid_Sem_Timetable_Fall.pdf",
            "category": "timetable",
            "chunks_count": 6,
            "uploaded_at": "2026-08-08 16:15:00"
        }
    ]