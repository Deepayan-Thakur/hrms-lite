import { useState } from "react";
import { markAttendance, getAttendance } from "../api/attendance";
import AttendanceForm from "../components/AttendanceForm";
import AttendanceTable from "../components/AttendanceTable";

export default function Attendance() {
  const [employeeId, setEmployeeId] = useState("");
  const [records, setRecords] = useState([]);

  const submitAttendance = async (data) => {
    await markAttendance(data); // API call
    alert("Attendance marked");
  };

  const fetchAttendance = async () => {
    const res = await getAttendance(employeeId); // API call
    setRecords(res.data);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">

        {/* Header */}
        <div className="text-center sm:text-left border-b border-gray-200 pb-5">
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Attendance</h2>
          <p className="mt-2 text-sm text-gray-500">Manage daily check-ins and view employee history.</p>
        </div>

        {/* New Entry Form Section */}
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
