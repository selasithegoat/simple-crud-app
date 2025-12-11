import { useState, useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "../components/ButtonComponent/Button";
import Modal from "../components/Modal/Modal";

import "./Homepage.css";

function Homepage() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [modalType, setModalType] = useState(""); // "add" | "edit"
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [error, setError] = useState(null);

  const emptyForm = {
    firstName: "",
    lastName: "",
    email: "",
    salary: "",
    startDate: "",
  };

  const [formData, setFormData] = useState(emptyForm);

 
  // Handle input change
  function handleInputChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  // Add Employee
  async function addEmployee(e) {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/add-employee", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) return alert(data.message);

      await loadEmployees();
      setFormData(emptyForm);
      setIsOpen(false);

      alert("Employee added successfully");
    } catch (err) {
      alert("Network or server error");
      console.error(err);
    }
  }

  // Edit Employee
  async function updateEmployee(e) {
    e.preventDefault();

    try {
      const res = await fetch(
        `http://localhost:5000/update-employee/${selectedEmployee._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );
      
      const data = await res.json();
      if (!res.ok) return alert(data.message);

      await loadEmployees();
      setIsOpen(false);
      alert("Employee updated successfully");
    } catch (err) {
      alert("Server error");
      console.error(err);
    }
  }

  // Delete Employee
  const deleteEmployee = async (id) => {
    if (!window.confirm("Delete this employee?")) return;

    try {
      const res = await fetch(`http://localhost:5000/delete-employee/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) return alert("Failed to delete employee");

      setEmployees((prev) => prev.filter((emp) => emp._id !== id));
      alert("Employee deleted");
    } catch (err) {
      alert("Error deleting employee");
    }
  };

  // Fetch all employees
  const loadEmployees = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const res = await fetch("http://localhost:5000/employees");
      if (!res.ok) throw Error("Failed to load employees");

      const data = await res.json();
      setEmployees(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadEmployees();
  }, []);

  // Open modal for add / edit
  function openAddModal() {
    setModalType("add");
    setFormData(emptyForm);
    setSelectedEmployee(null);
    setIsOpen(true);
  }

  function openEditModal(employee) {
    setModalType("edit");
    setSelectedEmployee(employee);
    setFormData(employee);
    setIsOpen(true);
  }

  return (
    <div className="section">
      <h1 className="title">Employee Management Software</h1>

      <div className="action-btns">
        <Button variant="primary" size="md" onClick={openAddModal}>
          Add Employee
        </Button>

        <Button variant="secondary" size="sm">Logout</Button>
      </div>

      <br />

      <div className="table">
        {/* Loading */}
        {isLoading && (
          <div className="loading-icon-container">
            <CircularProgress />
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="error-text-container">
            <p>{error}</p>
          </div>
        )}

        {/* Table */}
        {!isLoading && !error && (
          <table>
            <thead>
              <tr>
                <th>No.</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Salary</th>
                <th>Date</th>
                <th className="actions-column">Actions</th>
              </tr>
            </thead>

            <tbody>
              {employees.length === 0 ? (
                <tr>
                  <td colSpan="7">No employees</td>
                </tr>
              ) : (
                employees.map((emp, index) => (
                  <tr key={emp._id}>
                    <td>{index + 1}</td>
                    <td>{emp.firstName}</td>
                    <td>{emp.lastName}</td>
                    <td>{emp.email}</td>
                    <td>{emp.salary}</td>
                    <td>{new Date(emp.createdAt).toLocaleDateString()}</td>

                    <td>
                      <div className="actions">
                        <Button
                          variant="secondary"
                          size="sm"
                          className="table-btn"
                          onClick={() => openEditModal(emp)}
                        >
                          Edit
                        </Button>

                        <Button
                          variant="secondary"
                          size="sm"
                          className="table-btn"
                          onClick={() => deleteEmployee(emp._id)}
                        >
                          Delete
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* Dynamic Modal */}
      <Modal openModal={isOpen} closeModal={() => setIsOpen(false)}>
        <div className="modal-overlay">
          <div className="modal">
            <div className="header">
              <h2>{modalType === "add" ? "Add Employee" : "Edit Employee"}</h2>
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x-icon lucide-x" onClick={() => setIsOpen(false)} > <path d="M18 6 6 18" /> <path d="m6 6 12 12" /> </svg>
            </div>

            <div className="form-container">
              <form onSubmit={modalType === "add" ? addEmployee : updateEmployee}>
                
                {/* FIRST NAME */}
                <div className="form-group">
                  <label>First Name</label>
                  <input
                    name="firstName"
                    type="text"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                {/* LAST NAME */}
                <div className="form-group">
                  <label>Last Name</label>
                  <input
                    name="lastName"
                    type="text"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                {/* EMAIL */}
                <div className="form-group">
                  <label>Email</label>
                  <input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                {/* SALARY */}
                <div className="form-group">
                  <label>Salary</label>
                  <input
                    name="salary"
                    type="text"
                    value={formData.salary}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                {/* BUTTONS */}
                <div className="button-group">
                  <Button variant="secondary" size="sm" type="button" onClick={() => setIsOpen(false)}>
                    Cancel
                  </Button>

                  <Button variant="primary" size="md" type="submit">
                    {modalType === "add" ? "Add Employee" : "Update Employee"}
                  </Button>
                </div>

              </form>
            </div>

          </div>
        </div>
      </Modal>
    </div>
  );
}

export default Homepage;
