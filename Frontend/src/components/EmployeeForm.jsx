import React, { useState, useEffect } from "react";

const EmployeeForm = ({ onSave, onClose, initialData, employees = [] }) => {
  const [form, setForm] = useState({
    employee_id: "",
    employee_name: "",
    department: "",
    designation: "",
    project: "",
    type: "",
    status: "",
  });

  const [error, setError] = useState("");

  useEffect(() => {
    if (initialData) {
      setForm(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    setError("");
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check for duplicate only if it's a new employee
    if (
      !initialData && 
      Array.isArray(employees) &&
      employees.some((emp) => emp.employee_id === form.employee_id)
    ) {
      setError("Employee ID must be unique.");
      return;
    }

    onSave(form);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <h2 className="text-xl font-semibold">
        {initialData ? "Edit Employee" : "Add Employee"}
      </h2>

      <input
        type="text"
        name="employee_id"
        placeholder="Employee ID"
        value={form.employee_id}
        onChange={handleChange}
        required
        className="border rounded px-3 py-2"
        disabled={!!initialData}
      />
      {error && <p className="text-red-600">{error}</p>}

      <input
        type="text"
        name="employee_name"
        placeholder="Employee Name"
        value={form.employee_name}
        onChange={handleChange}
        required
        className="border rounded px-3 py-2"
      />

      <input
        type="text"
        name="department"
        placeholder="Department"
        value={form.department}
        onChange={handleChange}
        required
        className="border rounded px-3 py-2"
      />

      <input
        type="text"
        name="designation"
        placeholder="Designation"
        value={form.designation}
        onChange={handleChange}
        required
        className="border rounded px-3 py-2"
      />

      <input
        type="text"
        name="project"
        placeholder="Project"
        value={form.project}
        onChange={handleChange}
        required
        className="border rounded px-3 py-2"
      />

      <select
        name="type"
        value={form.type}
        onChange={handleChange}
        required
        className="border rounded px-3 py-2"
      >
        <option value="">Select Type</option>
        <option value="Full-time">Office</option>
        <option value="Part-time">WFH</option>
        <option value="Intern">Intern</option>
        
      </select>

      <select
        name="status"
        value={form.status}
        onChange={handleChange}
        required
        className="border rounded px-3 py-2"
      >
        <option value="">Select Status</option>
        <option value="Active">permanent</option>
        <option value="Inactive">Temporary</option>
      </select>

      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 border rounded hover:bg-gray-100"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          {initialData ? "Update" : "Add"}
        </button>
      </div>
    </form>
  );
};

export default EmployeeForm;
