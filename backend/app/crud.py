from sqlalchemy.orm import Session
from .models import Employee, Attendance
from .schemas import EmployeeCreate, AttendanceCreate

def create_employee(db: Session, employee: EmployeeCreate):
    db_employee = Employee(**employee.dict())
    db.add(db_employee)
    db.commit()
    db.refresh(db_employee)
    return db_employee


def get_all_employees(db: Session):
    return db.query(Employee).all()


def delete_employee(db: Session, employee_id: str):
    employee = db.query(Employee).filter(
        Employee.employee_id == employee_id
    ).first()

    if employee:
        db.delete(employee)
        db.commit()
        return True
    return False


def mark_attendance(db: Session, attendance: AttendanceCreate):
    record = Attendance(**attendance.dict())
    db.add(record)
    db.commit()
    db.refresh(record)
    return record


def get_attendance_by_employee(db: Session, employee_id: str):
    return db.query(Attendance).filter(
        Attendance.employee_id == employee_id
    ).all()
