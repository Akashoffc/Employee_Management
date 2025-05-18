// File: routes/employee.js
const express = require("express");
const router = express.Router();
const db = require("../db");

// Get all employees
router.get("/", (req, res) => {
  db.query("SELECT * FROM employees", (err, results) => {
    if (err) {
      console.error("Error fetching employees:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json(results);
  });
});

// Add a new employee
router.post("/", (req, res) => {
  const {
    employee_id,
    employee_name,
    department,
    designation,
    project,
    type,
    status,
  } = req.body;

  if (!employee_id || !employee_name || !department || !designation || !project || !type || !status) {
    return res.status(400).json({ error: "Missing fields" });
  }

  const query = `
    INSERT INTO employees
    (employee_id, employee_name, department, designation, project, type, status)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    query,
    [employee_id, employee_name, department, designation, project, type, status],
    (err, result) => {
      if (err) {
        console.error("Error adding employee:", err);
        return res.status(500).json({ error: "Database error" });
      }
      res.status(201).json({ message: "Employee added successfully" });
    }
  );
});

module.exports = router;