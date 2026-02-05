import { useState } from "react";
import Navbar from "./components/Navbar";
import Employees from "./pages/Employees";
import Attendance from "./pages/Attendance";

export default function App() {
  const [page, setPage] = useState("employees");

  return (
    <div>
      <Navbar page={page} setPage={setPage} />
      {page === "employees" ? <Employees /> : <Attendance />}
    </div>
  );
}
