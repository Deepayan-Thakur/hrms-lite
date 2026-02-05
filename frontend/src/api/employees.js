import api from "./axios";

export const getEmployees = () => api.get("/employees");

export const createEmployee = (data) =>
  api.post("/employees", data);

export const deleteEmployee = (employeeId) =>
  api.delete(`/employees/${employeeId}`);
