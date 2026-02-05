import AttendanceForm from "../components/AttendanceForm";
import { markAttendance } from "../api/attendance";

export default function Attendance() {
  const submitAttendance = async (data) => {
    try {
      await markAttendance(data);
      alert("Attendance marked successfully");
    } catch (err) {
      alert(err.response?.data?.detail || "Error marking attendance");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Attendance</h2>
      <AttendanceForm onSubmit={submitAttendance} />
    </div>
  );
}
