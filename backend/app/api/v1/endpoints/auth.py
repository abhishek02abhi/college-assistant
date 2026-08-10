from fastapi import APIRouter, HTTPException, Status, Depends
from pydantic import BaseModel, EmailStr
from typing import Optional
import uuid

router = APIRouter()

# In-memory user database store for demo/development
MOCK_USERS_DB = {
    "rahul.sharma@college.edu": {
        "id": "std-101",
        "name": "Rahul Sharma",
        "email": "rahul.sharma@college.edu",
        "password": "password123",
        "roll_no": "21CS104",
        "role": "student",
        "branch": "Computer Science & Engineering",
        "semester": 5,
    },
    "priya.patel@college.edu": {
        "id": "std-102",
        "name": "Priya Patel",
        "email": "priya.patel@college.edu",
        "password": "password123",
        "roll_no": "21CS112",
        "role": "student",
        "branch": "Computer Science & Engineering",
        "semester": 5,
    },
    "amit.kumar@college.edu": {
        "id": "std-103",
        "name": "Amit Kumar",
        "email": "amit.kumar@college.edu",
        "password": "password123",
        "roll_no": "21EC045",
        "role": "student",
        "branch": "Electronics & Communication",
        "semester": 5,
    },
    "admin@college.edu": {
        "id": "adm-001",
        "name": "Dr. V. K. Sharma (Dean)",
        "email": "admin@college.edu",
        "password": "adminpassword",
        "roll_no": "FAC-001",
        "role": "admin",
        "branch": "Administration",
        "semester": 0,
    }
}

class RegisterRequest(BaseModel):
    name: str
    email: EmailStr
    password: str
    roll_no: str
    branch: str
    semester: int
    role: Optional[str] = "student"

class LoginRequest(BaseModel):
    email: EmailStr
    password: str

class AuthResponse(BaseModel):
    user_id: str
    name: str
    email: str
    roll_no: str
    role: str
    branch: str
    semester: int
    token: str
    message: str

@router.post("/auth/register", response_model=AuthResponse)
def register_user(payload: RegisterRequest):
    email = payload.email.lower()
    if email in MOCK_USERS_DB:
        raise HTTPException(
            status_code=Status.HTTP_400_BAD_REQUEST,
            detail="Student with this email address already exists. Please login."
        )

    user_id = f"std-{uuid.uuid4().hex[:6]}"
    user_data = {
        "id": user_id,
        "name": payload.name,
        "email": email,
        "password": payload.password,
        "roll_no": payload.roll_no,
        "role": payload.role or "student",
        "branch": payload.branch,
        "semester": payload.semester,
    }
    
    MOCK_USERS_DB[email] = user_data

    return AuthResponse(
        user_id=user_id,
        name=payload.name,
        email=email,
        roll_no=payload.roll_no,
        role=user_data["role"],
        branch=payload.branch,
        semester=payload.semester,
        token=f"mock-jwt-token-{user_id}",
        message="Registration successful! Welcome to AI Campus Assistant."
    )

@router.post("/auth/login", response_model=AuthResponse)
def login_user(payload: LoginRequest):
    email = payload.email.lower()
    user = MOCK_USERS_DB.get(email)

    if not user or user["password"] != payload.password:
        raise HTTPException(
            status_code=Status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password credentials."
        )

    return AuthResponse(
        user_id=user["id"],
        name=user["name"],
        email=user["email"],
        roll_no=user["roll_no"],
        role=user["role"],
        branch=user["branch"],
        semester=user["semester"],
        token=f"mock-jwt-token-{user['id']}",
        message="Login successful!"
    )