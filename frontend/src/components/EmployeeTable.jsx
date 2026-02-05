export default function EmployeeTable({ employees, onDelete }) {
  return (
    <table className="w-full border border-slate-300">
      <thead className="bg-slate-100">
        <tr>
          <th className="p-2 border">ID</th>
          <th className="p-2 border">Name</th>
          <th className="p-2 border">Email</th>
          <th className="p-2 border">Department</th>
          <th className="p-2 border">Action</th>
        </tr>
      </thead>
      <tbody>
        {employees.map((emp) => (
          <tr key={emp.employee_id}>
            <td className="p-2 border">{emp.employee_id}</td>
            <td className="p-2 border">{emp.full_name}</td>
            <td className="p-2 border">{emp.email}</td>
            <td className="p-2 border">{emp.department}</td>
            <td className="p-2 border">
              <button
                onClick={() => onDelete(emp.employee_id)}
                className="text-red-500 hover:underline"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
