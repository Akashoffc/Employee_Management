import React from "react";

const EmployeeDetails = ({ employee }) => {
  if (!employee) return null;

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Employee Details</h2>
      <table className="min-w-full border border-gray-300 rounded-md">
        <tbody>
          <tr>
            <th className="border px-4 py-2 text-left">Employee ID</th>
            <td className="border px-4 py-2">{employee.employee_id}</td>
          </tr>
          <tr>
            <th className="border px-4 py-2 text-left">Name</th>
            <td className="border px-4 py-2">{employee.employee_name}</td>
          </tr>
          <tr>
            <th className="border px-4 py-2 text-left">Department</th>
            <td className="border px-4 py-2">{employee.department}</td>
          </tr>
          <tr>
            <th className="border px-4 py-2 text-left">Designation</th>
            <td className="border px-4 py-2">{employee.designation}</td>
          </tr>
          <tr>
            <th className="border px-4 py-2 text-left">Project</th>
            <td className="border px-4 py-2">{employee.project}</td>
          </tr>
          <tr>
            <th className="border px-4 py-2 text-left">Type</th>
            <td className="border px-4 py-2">{employee.type}</td>
          </tr>
          <tr>
            <th className="border px-4 py-2 text-left">Status</th>
            <td className="border px-4 py-2">{employee.status}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeDetails;
