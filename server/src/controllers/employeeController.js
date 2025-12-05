const Employee = require('../models/Employee');


async function getAllEmployees(req, res) {
    try{
        const employees = await Employee.findOne();
        res.status(200).json(employees)

    }catch(err){
        res.status(500).json({
            message: "error fetching employee",
            error: err.message
        })
    }
    res.render('/homepage')
}

async function getEmployeeById(req, res) {}

async function createEmployee(req, res) {
    try{
        const employee = await Employee.create(req.body)
    res.status(200).json({
        message: "employee created successfully",
        data: employee
    })

    }catch(err){
        res.status(400).json({
            message: "Error creating employee",
            error: err.message
        })
    }
}

async function updateEmployee(req, res) {}
async function deleteEmployee(req, res) {}

module.exports = {
  getAllEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
};
