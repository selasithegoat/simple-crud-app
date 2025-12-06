const {Router} = require('express');
const {
  getAllEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} = require("../controllers/employeeController");

const router = Router();

router.get('/employees', getAllEmployees);
router.get('/employees/:id', getEmployeeById);
router.post('/add-employee', createEmployee);
router.put('/update-employee/:id', updateEmployee);
router.delete('/delete-employee/:id', deleteEmployee);

module.exports = router;