from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from .database import SessionLocal, engine
from . import models, schemas, crud

models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="HRMS Lite API")

# ✅ CORS FIX
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "https://hrms-lite-teal.vercel.app"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.post("/employees", status_code=status.HTTP_201_CREATED)
def create_employee(employee: schemas.EmployeeCreate, db: Session = Depends(get_db)):
    existing = db.query(models.Employee).filter(
        (models.Employee.employee_id == employee.employee_id) |
        (models.Employee.email == employee.email)
    ).first()

    if existing:
        raise HTTPException(
            status_code=400,
            detail="Employee with this ID or email already exists"
        )

    return crud.create_employee(db, employee)


@app.get("/employees")
def list_employees(db: Session = Depends(get_db)):
    return crud.get_all_employees(db)


@app.delete("/employees/{employee_id}", status_code=204)
def remove_employee(employee_id: str, db: Session = Depends(get_db)):
    deleted = crud.delete_employee(db, employee_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Employee not found")


@app.post("/attendance", status_code=201)
def mark_attendance(attendance: schemas.AttendanceCreate, db: Session = Depends(get_db)):
    employee = db.query(models.Employee).filter(
        models.Employee.employee_id == attendance.employee_id
    ).first()

    if not employee:
        raise HTTPException(status_code=404, detail="Employee not found")

    return crud.mark_attendance(db, attendance)


@app.get("/attendance/{employee_id}")
def get_attendance(employee_id: str, db: Session = Depends(get_db)):
    return crud.get_attendance_by_employee(db, employee_id)
