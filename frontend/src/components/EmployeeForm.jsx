import { useState } from "react";

export default function EmployeeForm({ onSubmit }) {
  const [form, setForm] = useState({
    employee_id: "",
    full_name: "",
    email: "",
    department: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(form);
        setForm({ employee_id: "", full_name: "", email: "", department: "" });
      }}
      className="space-y-3 mb-6"
    >
      {Object.keys(form).map((key) => (
        <input
          key={key}
          name={key}
          value={form[key]}
          onChange={handleChange}
          placeholder={key.replace("_", " ")}
          className="w-full border p-2"
          required
        />
      ))}

      <button className="bg-emerald-500 text-white px-4 py-2">
        Add Employee
      </button>
    </form>
  );
}
