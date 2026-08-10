from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Optional

router = APIRouter()

class ChatRequest(BaseModel):
    message: str
    user_id: Optional[str] = None

class CitationSchema(BaseModel):
    document_name: str
    page_number: int
    snippet: str

class ChatResponse(BaseModel):
    reply: str
    tool_used: Optional[str] = None
    citations: Optional[List[CitationSchema]] = None

@router.post("/chat", response_model=ChatResponse)
def handle_chat_query(payload: ChatRequest):
    """
    Endpoint handling student query requests with LangChain / Gemini RAG system logic.
    """
    user_query = payload.message.lower()

    # Rule-based / RAG Agent response routing demonstration
    if "attendance" in user_query or "classes" in user_query:
        return ChatResponse(
            reply="Aapki abhi attendance 70% hai (120 Total Classes). 75% maintain karne ke liye aapko aage lagataar **24 classes** attend karni hongi.",
            tool_used="calculate_required_attendance",
            citations=[]
        )
    elif "dbms" in user_query or "syllabus" in user_query:
        return ChatResponse(
            reply="DBMS Mid-Sem Syllabus me shamil hain:\n1. ER Diagram & Relational Model\n2. SQL Queries & Joins\n3. Normalization (1NF, 2NF, 3NF, BCNF)\n4. Transaction Management & ACID Properties.",
            tool_used=None,
            citations=[
                CitationSchema(
                    document_name="DBMS_Syllabus_2026.pdf",
                    page_number=2,
                    snippet="Module 2 & 3: Relational Algebra, SQL triggers, and Normalization criteria up to BCNF."
                )
            ]
        )
    else:
        return ChatResponse(
            reply=f"Aapke sawal '{payload.message}' ka uttar vector database aur campus document store ke anusar taiyar kiya ja raha hai.",
            tool_used=None,
            citations=[
                CitationSchema(
                    document_name="Student_Handbook.pdf",
                    page_number=5,
                    snippet="General campus conduct and academic guidelines."
                )
            ]
        )