export default function Navbar({ page, setPage }) {
  return (
    <nav className="bg-slate-900 text-white px-6 py-4 flex gap-6">
      <button
        onClick={() => setPage("employees")}
        className={`font-medium ${
          page === "employees" ? "text-emerald-400" : ""
        }`}
      >
        Employees
      </button>

      <button
        onClick={() => setPage("attendance")}
        className={`font-medium ${
          page === "attendance" ? "text-emerald-400" : ""
        }`}
      >
        Attendance
      </button>
    </nav>
  );
}
