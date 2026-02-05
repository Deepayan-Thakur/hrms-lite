import { useState } from "react";

export default function AttendanceForm({ onSubmit }) {
  const [form, setForm] = useState({
    employee_id: "",
    date: "",
    status: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(form);
        setForm({ employee_id: "", date: "", status: "" });
      }}
      className="space-y-3 max-w-md"
    >
      <input
        name="employee_id"
        placeholder="Employee ID"
        value={form.employee_id}
        onChange={handleChange}
        className="w-full border p-2"
        required
      />

      <input
        type="date"
        name="date"
        value={form.date}
        onChange={handleChange}
        className="w-full border p-2"
        required
      />

      <input
        name="status"
        placeholder="Present / Absent"
        value={form.status}
        onChange={handleChange}
        className="w-full border p-2"
        required
      />

      <button className="bg-emerald-500 text-white px-4 py-2">
        Mark Attendance
      </button>
    </form>
  );
}
