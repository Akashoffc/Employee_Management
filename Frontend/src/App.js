import React, { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import EmployeeTable from "./components/EmployeeTable";
import axios from "axios"; // 📦 Axios for HTTP requests

function App() {
  const [activeMenu, setActiveMenu] = useState("Dashboard");
  const [employees, setEmployees] = useState([]);

  // Fetch employees from backend
  useEffect(() => {
    if (activeMenu === "Employee") {
      axios
        .get("http://localhost:5000/employees")
        .then((res) => setEmployees(res.data))
        .catch((err) => console.error("Error fetching employees:", err));
    }
  }, [activeMenu]);

  return (
    <div className="flex">
      <Sidebar active={activeMenu} setActive={setActiveMenu} />
      <main className="flex-1 p-6 bg-gray-50 min-h-screen">
        {activeMenu === "Employee" && <EmployeeTable employees={employees} />}
        {activeMenu === "Dashboard" && (
          <h1 className="text-3xl font-bold">Dashboard Content Here</h1>
        )}
        {activeMenu === "Calendar" && (
          <h1 className="text-3xl font-bold">Calendar Content Here</h1>
        )}
        {activeMenu === "Message" && (
          <h1 className="text-2xl font-bold">💼 Empowering Teams. Simplifying Management.
A well-managed team is a successful team. Stay organized, informed, and ahead with our Employee Management System.</h1>
        )}
      </main>
    </div>
  );
}

export default App;
