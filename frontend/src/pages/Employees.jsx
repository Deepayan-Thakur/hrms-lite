import { useEffect, useState } from "react";
import { getEmployees, createEmployee, deleteEmployee } from "../api/employees";
import EmployeeForm from "../components/EmployeeForm";
import EmployeeTable from "../components/EmployeeTable";


const createEmployee = async (data) => new Promise(resolve => setTimeout(resolve, 500));
const deleteEmployee = async (id) => new Promise(resolve => setTimeout(resolve, 500));

const EmployeeForm = ({ onSubmit }) => {
  const [data, setData] = useState({ name: "", role: "", email: "" });
  const handleSubmit = () => { onSubmit(data); setData({name:"", role:"", email:""}); };
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
       <div className="space-y-1">
          <label className="text-xs font-semibold text-gray-500 uppercase">Name</label>
          <input className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" 
            value={data.name} onChange={e => setData({...data, name: e.target.value})} placeholder="Full Name" />
       </div>
       <div className="space-y-1">
          <label className="text-xs font-semibold text-gray-500 uppercase">Role</label>
          <input className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" 
            value={data.role} onChange={e => setData({...data, role: e.target.value})} placeholder="Job Title" />
       </div>
       <div className="space-y-1">
          <label className="text-xs font-semibold text-gray-500 uppercase">Email</label>
          <input className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" 
            value={data.email} onChange={e => setData({...data, email: e.target.value})} placeholder="email@company.com" />
       </div>
       <button onClick={handleSubmit} className="bg-blue-600 text-white font-medium py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors shadow-sm text-sm h-[38px]">
          Add Employee
       </button>
    </div>
  );
};

const EmployeeTable = ({ employees, onDelete }) => (
  <div className="overflow-x-auto">
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          {['Name', 'Role', 'Email', 'Actions'].map((h) => (
             <th key={h} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{h}</th>
          ))}
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {employees.map((e) => (
          <tr key={e.id} className="hover:bg-gray-50">
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{e.name}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{e.role}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{e.email}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              <button onClick={() => onDelete(e.id)} className="text-red-600 hover:text-red-900 font-medium">Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

// --- MAIN COMPONENT ---

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
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        
        <div className="flex justify-between items-center border-b border-gray-200 pb-5">
           <div>
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Employees</h2>
            <p className="mt-2 text-sm text-gray-500">Directory of all active team members.</p>
           </div>
           <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
             {employees.length} Total
           </span>
        </div>

        <section className="bg-white shadow-sm rounded-xl border border-gray-200 p-6">
           <h3 className="text-lg font-medium text-gray-900 mb-4">Add New Member</h3>
           <EmployeeForm onSubmit={addEmployee} />
        </section>

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