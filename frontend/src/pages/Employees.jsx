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
    await createEmployee(data); // API call
    load();
  };

  const removeEmployee = async (id) => {
    if (confirm("Are you sure you want to delete this employee?")) {
      await deleteEmployee(id); // API call
      load();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">

        {/* Header */}
        <div className="flex justify-between items-center border-b border-gray-200 pb-5">
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Employees</h2>
            <p className="mt-2 text-sm text-gray-500">Directory of all active team members.</p>
          </div>
          <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
            {employees.length} Total
          </span>
        </div>

        {/* Add New Member Section */}
        <section className="bg-white shadow-sm rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Add New Member</h3>
          <EmployeeForm onSubmit={addEmployee} />
        </section>

        {/* Staff List Table */}
        <section className="bg-white shadow-sm rounded-xl border border-gray-200 overflow-hidden">
          <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Staff List</h3>
          </div>
          <EmployeeTable employees={employees} onDelete={removeEmployee} />
        </section>

      </div>
    </div>
  );
}
