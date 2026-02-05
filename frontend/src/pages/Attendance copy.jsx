import { useState } from "react";
import { markAttendance, getAttendance } from "../api/attendance";
import AttendanceForm from "../components/AttendanceForm";
import AttendanceTable from "../components/AttendanceTable";

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
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Attendance</h2>

      <AttendanceForm onSubmit={submitAttendance} />

      <div className="flex gap-2 mb-4">
        <input
          placeholder="Employee ID"
          value={employeeId}
          onChange={(e) => setEmployeeId(e.target.value)}
          className="border p-2"
        />
        <button
          onClick={fetchAttendance}
          className="bg-green-600 text-white px-4"
        >
          View Attendance
        </button>
      </div>

      <AttendanceTable records={records} />
    </div>
  );
}
