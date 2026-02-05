# HRMS Lite

## Project Overview
A lightweight Human Resource Management System (HRMS Lite) that allows an admin to manage employees and track daily attendance.

## Scope
- Single admin (no authentication)
- Employee management
- Attendance tracking

## Tech Stack (Planned)
Frontend:
- React (Vite)
- Tailwind CSS
- Axios

Backend:
- FastAPI
- SQLAlchemy
- Pydantic

Database:
- PostgreSQL (Production)
- SQLite (Local)

Deployment:
- Frontend: Vercel
- Backend: Render

## System Design

### Database Schema

Employees:
- employee_id (unique)
- full_name
- email (unique)
- department

Attendance:
- employee_id (FK)
- date
- status (Present / Absent)

### API Design

Employees:
- POST /employees
- GET /employees
- DELETE /employees/{employee_id}

Attendance:
- POST /attendance
- GET /attendance/{employee_id}
