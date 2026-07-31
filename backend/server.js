const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Sample Data (Employees API as referenced in project specs)
const employees = [
  { id: 1, name: "Ali", department: "DevOps" },
  { id: 2, name: "Ahmed", department: "Cloud" },
  { id: 3, name: "Sara", department: "Engineering" },
  { id: 4, name: "Rehman", department: "Developer" },
  { id: 5, name: "Nazim", department: "Developers" }
];

// Root / API check route
app.get('/api', (req, res) => {
  res.json({ message: "Backend API is running successfully" });
});

// Employees route
app.get('/api/employees', (req, res) => {
  res.json(employees);
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Backend server is running on port ${PORT}`);
});

