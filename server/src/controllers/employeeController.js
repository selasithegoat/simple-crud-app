const mongoose = require("mongoose");
const Employee = require("../models/employeeSchema");

async function getAllEmployees(req, res) {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (e) {
    res.status(500).json({
      message: "Couldn't get employees",
      error: e.message,
    });
  }
}

async function getEmployeeById(req, res) {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found!" });
    }

    res.status(200).json(employee);
  } catch (e) {
    res.status(500).json({
      message: "Couldn't get employee, something went wrong!",
      error: e.message,
    });
  }
}

async function createEmployee(req, res) {
  try {
    const employee = await Employee.create(req.body);
    res
      .status(201)
      .json({ message: "Successfully added employee", data: employee });
  } catch (e) {
    res.status(400).json({ message: "Couldn't add employee, something went wrong!" });
  }
}
async function updateEmployee(req, res) {
  try {
    const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!employee) {
      return res.status(404).json({ message: "Employee not found!" });
    }
    res
      .status(200)
      .json({ message: "Employee updated successfully", data: employee });
  } catch (e) {
    res.status(400).json({ message: "Couldn't update employee, something went wrong!" });
  }
}
async function deleteEmployee(req, res) {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id, {new:true});
    if (!employee) {
        return res.status(404).json({ message: "Employee not found!" });
      }
    res
      .status(200)
      .json({ message: "Employee deleted successfully", data: employee });
  } catch (e) {
    res.status(400).json({ message: "Couldn't delete employee, something went wrong!" });
  }
};

module.exports = {
  getAllEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
};
