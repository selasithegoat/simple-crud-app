const { Router } = require("express");
const {
  getAllEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} = require("../controllers/employeeController");

const router = Router();

// GET all employees
router.get('/employees', getAllEmployees);

// GET single employee
router.get('/:id', getEmployeeById);

// POST create employee
router.post('/create-employee', createEmployee);

// PUT update employee
router.put('/:id', updateEmployee);

// DELETE employee
router.delete('/:id', deleteEmployee);

module.exports = router;
