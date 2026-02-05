import { useState } from "react";
import { markAttendance, getAttendance } from "../api/attendance";
import AttendanceForm from "../components/AttendanceForm";
import AttendanceTable from "../components/AttendanceTable";

const markAttendance = async (data) => new Promise(resolve => setTimeout(resolve, 500));

const AttendanceForm = ({ onSubmit }) => {
  const [data, setData] = useState({ employeeId: "", status: "Present" });
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Employee ID</label>
          <input 
            className="w-full rounded-lg border-gray-300 border px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" 
            placeholder="e.g. EMP123"
            value={data.employeeId}
            onChange={e => setData({...data, employeeId: e.target.value})}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
          <select 
            className="w-full rounded-lg border-gray-300 border px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white"
            value={data.status}
            onChange={e => setData({...data, status: e.target.value})}
          >
            <option>Present</option>
            <option>Absent</option>
            <option>On Leave</option>
          </select>
        </div>
      </div>
      <button 
        onClick={() => onSubmit(data)}
        className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors shadow-sm"
      >
        Mark Attendance
      </button>
    </div>
  );
};

const AttendanceTable = ({ records }) => (
  <div className="overflow-x-auto">
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          {['Employee ID', 'Date', 'Status', 'Check In', 'Check Out'].map((h) => (
            <th key={h} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{h}</th>
          ))}
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {records.length === 0 ? (
          <tr><td colSpan="5" className="px-6 py-8 text-center text-gray-500 italic">No records found.</td></tr>
        ) : (
          records.map((r) => (
            <tr key={r.id} className="hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{r.employeeId}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{r.date}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                  r.status === 'Present' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {r.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{r.checkIn}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{r.checkOut}</td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  </div>
);

// --- MAIN COMPONENT ---

export default function Attendance() {
  const [employeeId, setEmployeeId] = useState("");
  const [records, setRecords] = useState([]);

  const submitAttendance = async (data) => {
    await markAttendance(data);
    alert("Attendance marked");
  };

  const fetchAttendance = async () => {
    const res = await getAttendance(employeeId);
    setRecords(res.data);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="text-center sm:text-left border-b border-gray-200 pb-5">
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            Attendance
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            Manage daily check-ins and view employee history.
          </p>
        </div>

        {/* Input Form Section */}
        <section className="bg-white shadow-sm rounded-xl border border-gray-200 overflow-hidden">
          <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
             <h3 className="text-lg font-medium text-gray-900">New Entry</h3>
          </div>
          <div className="p-6">
            <AttendanceForm onSubmit={submitAttendance} />
          </div>
        </section>

        {/* Records Filter & Table Section */}
        <section className="bg-white shadow-sm rounded-xl border border-gray-200 overflow-hidden">
           <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
             <h3 className="text-lg font-medium text-gray-900">History Log</h3>
             
             {/* Search Controls */}
             <div className="flex gap-3">
                <input
                  placeholder="Filter by ID..."
                  value={employeeId}
                  onChange={(e) => setEmployeeId(e.target.value)}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border px-3 py-2"
                />
                <button
                  onClick={fetchAttendance}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  View
                </button>
             </div>
          </div>

          <div className="p-0">
             <AttendanceTable records={records} />
          </div>
        </section>

      </div>
    </div>
  );
}