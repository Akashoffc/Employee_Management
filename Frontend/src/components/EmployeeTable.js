import React, { useState, useEffect } from "react";
import Modal from "./Modal";
import EmployeeForm from "./EmployeeForm";
import ConfirmDeleteModal from "./ConfirmDeleteModal";

const EmployeeTable = () => {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editEmployee, setEditEmployee] = useState(null);
  const [viewEmployee, setViewEmployee] = useState(null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState(null);

  // Fetch employees from backend
  useEffect(() => {
    fetch("http://localhost:5000/employees")
      .then((res) => res.json())
      .then(setEmployees)
      .catch((err) => console.error("Failed to load employees", err));
  }, []);

  const handleAddClick = () => {
    setEditEmployee(null);
    setIsModalOpen(true);
  };

  const handleEditClick = (employee) => {
    setEditEmployee(employee);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (id) => {
    setEmployeeToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    fetch(`http://localhost:5000/employees/${employeeToDelete}`, {
      method: "DELETE",
    })
      .then(() => {
        setEmployees((prev) =>
          prev.filter((emp) => emp.employee_id !== employeeToDelete)
        );
        setIsDeleteModalOpen(false);
        setEmployeeToDelete(null);
      })
      .catch((err) => console.error("Delete failed", err));
  };

  const cancelDelete = () => {
    setIsDeleteModalOpen(false);
    setEmployeeToDelete(null);
  };

  const handleViewClick = (employee) => {
    setViewEmployee(employee);
  };

  const handleCloseView = () => {
    setViewEmployee(null);
  };

  const handleSave = (formData) => {
    const method = editEmployee ? "PUT" : "POST";
    const url = editEmployee
      ? `http://localhost:5000/employees/${formData.employee_id}`
      : "http://localhost:5000/employees";

    fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (method === "POST") {
          setEmployees((prev) => [...prev, formData]);
        } else {
          setEmployees((prev) =>
            prev.map((emp) =>
              emp.employee_id === formData.employee_id ? formData : emp
            )
          );
        }
        setIsModalOpen(false);
        setEditEmployee(null);
      })
      .catch((err) => {
        console.error("Save failed", err);
        alert("Failed to save employee.");
      });
  };

  const filteredEmployees = employees.filter((emp) =>
    emp.employee_name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Employee Management System</h1>

      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search employee..."
          className="border rounded px-4 py-2 w-64"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={handleAddClick}
        >
          Add Employee
        </button>
      </div>

      <table className="min-w-full border border-gray-300 rounded-md">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-4 py-2 text-left">Employee ID</th>
            <th className="border px-4 py-2 text-left">Name</th>
            <th className="border px-4 py-2 text-left">Department</th>
            <th className="border px-4 py-2 text-left">Designation</th>
            <th className="border px-4 py-2 text-left">Project</th>
            <th className="border px-4 py-2 text-left">Type</th>
            <th className="border px-4 py-2 text-left">Status</th>
            <th className="border px-4 py-2 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredEmployees.length === 0 ? (
            <tr>
              <td colSpan="8" className="text-center py-4">
                No employees found.
              </td>
            </tr>
          ) : (
            filteredEmployees.map((emp) => (
              <tr key={emp.employee_id} className="hover:bg-gray-50">
                <td className="border px-4 py-2">{emp.employee_id}</td>
                <td className="border px-4 py-2 flex items-center gap-2">
                  <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-semibold uppercase">
                    {emp.employee_name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .slice(0, 2)}
                  </div>
                  {emp.employee_name}
                </td>
                <td className="border px-4 py-2">{emp.department}</td>
                <td className="border px-4 py-2">{emp.designation}</td>
                <td className="border px-4 py-2">{emp.project}</td>
                <td className="border px-4 py-2">{emp.type}</td>
                <td className="border px-4 py-2">{emp.status}</td>
                <td className="border px-4 py-2">
                  <button
                    className="mr-2 text-green-600 hover:underline"
                    onClick={() => handleViewClick(emp)}
                  >
                    View
                  </button>
                  <button
                    className="mr-2 text-blue-600 hover:underline"
                    onClick={() => handleEditClick(emp)}
                  >
                    Edit
                  </button>
                  <button
                    className="text-red-600 hover:underline"
                    onClick={() => handleDeleteClick(emp.employee_id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <EmployeeForm
          onSave={handleSave}
          onClose={() => setIsModalOpen(false)}
          initialData={editEmployee}
          employees={employees}
        />
      </Modal>

      {viewEmployee && (
        <Modal isOpen={!!viewEmployee} onClose={handleCloseView}>
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-4">Employee Details</h2>
            <table className="min-w-full border border-gray-300 rounded-md">
              <tbody>
                <tr>
                  <td className="border px-4 py-2 font-semibold">Employee ID</td>
                  <td className="border px-4 py-2">{viewEmployee.employee_id}</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2 font-semibold">Name</td>
                  <td className="border px-4 py-2">{viewEmployee.employee_name}</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2 font-semibold">Department</td>
                  <td className="border px-4 py-2">{viewEmployee.department}</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2 font-semibold">Designation</td>
                  <td className="border px-4 py-2">{viewEmployee.designation}</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2 font-semibold">Project</td>
                  <td className="border px-4 py-2">{viewEmployee.project}</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2 font-semibold">Type</td>
                  <td className="border px-4 py-2">{viewEmployee.type}</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2 font-semibold">Status</td>
                  <td className="border px-4 py-2">{viewEmployee.status}</td>
                </tr>
              </tbody>
            </table>
            <div className="flex justify-end mt-4">
              <button
                onClick={handleCloseView}
                className="px-4 py-2 border rounded hover:bg-gray-100"
              >
                Close
              </button>
            </div>
          </div>
        </Modal>
      )}

      <ConfirmDeleteModal
        isOpen={isDeleteModalOpen}
        onCancel={cancelDelete}
        onConfirm={confirmDelete}
      />
    </div>
  );
};

export default EmployeeTable;
