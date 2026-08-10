from fastapi import APIRouter, HTTPException, Query
from pydantic import BaseModel
from typing import List, Optional

router = APIRouter()

class SubjectAttendanceSchema(BaseModel):
    code: str
    name: str
    professor: str
    attended: int
    total: int
    percentage: float

class StudentProfileSchema(BaseModel):
    id: str
    name: str
    roll_no: str
    email: str
    phone: str
    branch: str
    semester: int
    cgpa: float
    credits_earned: int
    attendance_percentage: float
    total_classes: int
    attended_classes: int
    required_classes_for_target: int
    target_percentage: float
    subjects: List[SubjectAttendanceSchema]

# Per-student mock database store
STUDENT_DATA_STORE = {
    "std-101": StudentProfileSchema(
        id="std-101",
        name="Rahul Sharma",
        roll_no="21CS104",
        email="rahul.sharma@college.edu",
        phone="+91 98765 43210",
        branch="Computer Science & Engineering",
        semester=5,
        cgpa=8.42,
        credits_earned=94,
        attendance_percentage=70.6,
        total_classes=150,
        attended_classes=106,
        required_classes_for_target=26,
        target_percentage=75.0,
        subjects=[
            SubjectAttendanceSchema(code="CS501", name="Database Management Systems", professor="Dr. A. K. Verma", attended=26, total=30, percentage=86.6),
            SubjectAttendanceSchema(code="CS502", name="Data Structures & Algorithms", professor="Prof. S. Mukherjee", attended=22, total=32, percentage=68.75),
            SubjectAttendanceSchema(code="CS503", name="Operating Systems", professor="Dr. Meenakshi Rao", attended=21, total=29, percentage=72.4),
            SubjectAttendanceSchema(code="CS504", name="Computer Networks", professor="Prof. R. P. Singh", attended=18, total=28, percentage=64.2),
            SubjectAttendanceSchema(code="CS505", name="Software Engineering", professor="Dr. Kavita Joshi", attended=19, total=21, percentage=90.4),
        ]
    ),
    "std-102": StudentProfileSchema(
        id="std-102",
        name="Priya Patel",
        roll_no="21CS112",
        email="priya.patel@college.edu",
        phone="+91 98123 45678",
        branch="Computer Science & Engineering",
        semester=5,
        cgpa=9.15,
        credits_earned=98,
        attendance_percentage=88.4,
        total_classes=140,
        attended_classes=124,
        required_classes_for_target=0,
        target_percentage=75.0,
        subjects=[
            SubjectAttendanceSchema(code="CS501", name="Database Management Systems", professor="Dr. A. K. Verma", attended=28, total=30, percentage=93.3),
            SubjectAttendanceSchema(code="CS502", name="Data Structures & Algorithms", professor="Prof. S. Mukherjee", attended=28, total=32, percentage=87.5),
            SubjectAttendanceSchema(code="CS503", name="Operating Systems", professor="Dr. Meenakshi Rao", attended=26, total=29, percentage=89.6),
            SubjectAttendanceSchema(code="CS504", name="Computer Networks", professor="Prof. R. P. Singh", attended=24, total=28, percentage=85.7),
            SubjectAttendanceSchema(code="CS505", name="Software Engineering", professor="Dr. Kavita Joshi", attended=20, total=21, percentage=95.2),
        ]
    ),
    "std-103": StudentProfileSchema(
        id="std-103",
        name="Amit Kumar",
        roll_no="21EC045",
        email="amit.kumar@college.edu",
        phone="+91 97654 32109",
        branch="Electronics & Communication",
        semester=5,
        cgpa=7.20,
        credits_earned=88,
        attendance_percentage=73.5,
        total_classes=132,
        attended_classes=97,
        required_classes_for_target=8,
        target_percentage=75.0,
        subjects=[
            SubjectAttendanceSchema(code="EC501", name="Digital Signal Processing", professor="Dr. S. K. Gupta", attended=22, total=31, percentage=71.0),
            SubjectAttendanceSchema(code="EC502", name="VLSI Design", professor="Prof. N. Sharma", attended=23, total=31, percentage=74.2),
            SubjectAttendanceSchema(code="EC503", name="Microcontrollers", professor="Dr. A. B. Roy", attended=22, total=29, percentage=75.8),
        ]
    )
}

@router.get("/student/profile", response_model=StudentProfileSchema)
def get_student_profile(student_id: Optional[str] = Query("std-101")):
    """
    Endpoint to retrieve student academic details and subject breakdown for a specific student.
    """
    student = STUDENT_DATA_STORE.get(student_id)
    if not student:
        # Return default fallback student profile if newly registered
        return StudentProfileSchema(
            id=student_id or "std-new",
            name="Registered Student",
            roll_no="21CS999",
            email="student@college.edu",
            phone="+91 99999 00000",
            branch="Computer Science & Engineering",
            semester=5,
            cgpa=8.0,
            credits_earned=90,
            attendance_percentage=78.0,
            total_classes=120,
            attended_classes=94,
            required_classes_for_target=0,
            target_percentage=75.0,
            subjects=[
                SubjectAttendanceSchema(code="CS501", name="Database Management Systems", professor="Dr. A. K. Verma", attended=24, total=30, percentage=80.0),
                SubjectAttendanceSchema(code="CS502", name="Data Structures & Algorithms", professor="Prof. S. Mukherjee", attended=25, total=32, percentage=78.1),
            ]
        )
    return student