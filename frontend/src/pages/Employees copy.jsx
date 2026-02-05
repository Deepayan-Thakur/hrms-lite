import { useEffect, useState } from "react";
import { getEmployees, createEmployee, deleteEmployee } from "../api/employees";
import EmployeeForm from "../components/EmployeeForm";
import EmployeeTable from "../components/EmployeeTable";

export default function Employees() {
  const [employees, setEmployees] = useState([]);

  const load = async () => {
    const res = await getEmployees();
    setEmployees(res.data);
  };

  useEffect(() => {
    load();
  }, []);

  const addEmployee = async (data) => {
    await createEmployee(data);
    load();
  };

  const removeEmployee = async (id) => {
    await deleteEmployee(id);
    load();
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Employees</h2>
      <EmployeeForm onSubmit={addEmployee} />
      <EmployeeTable employees={employees} onDelete={removeEmployee} />
    </div>
  );
}
