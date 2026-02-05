from fastapi import FastAPI, Depends, HTTPException, status
from sqlalchemy.orm import Session

from .database import SessionLocal, engine
from . import models, schemas, crud

models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="HRMS Lite API")

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/employees", status_code=status.HTTP_201_CREATED)
def create_employee(
    employee: schemas.EmployeeCreate,
    db: Session = Depends(get_db)
):
    # Check duplicate employee_id or email
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
