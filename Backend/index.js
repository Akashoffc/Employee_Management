const express = require("express");
const cors = require("cors");
const employeeRoutes = require("./routes/employee");

const app = express();
app.use(cors());
app.use(express.json());

// Route
app.use("/employees", employeeRoutes);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
