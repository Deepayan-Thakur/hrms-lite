import { useState } from "react";

export default function AttendanceForm({ onSubmit }) {
  const [form, setForm] = useState({
    employee_id: "",
    date: "",
    status: "Present",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
    setForm({ employee_id: "", date: "", status: "Present" });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mb-6">
      <input
        name="employee_id"
        placeholder="Employee ID"
        value={form.employee_id}
        onChange={handleChange}
        className="border p-2 w-full"
        required
      />

      <input
        type="date"
        name="date"
        value={form.date}
        onChange={handleChange}
        className="border p-2 w-full"
        required
      />

      <select
        name="status"
        value={form.status}
        onChange={handleChange}
        className="border p-2 w-full"
      >
        <option>Present</option>
        <option>Absent</option>
        <option>Leave</option>
      </select>

      <button className="bg-blue-600 text-white px-4 py-2 rounded">
        Mark Attendance
      </button>
    </form>
  );
}
