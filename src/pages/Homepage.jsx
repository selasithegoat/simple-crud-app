import { useState, useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "../components/ButtonComponent/Button";
import Modal from "../components/Modal/Modal";

import "./Homepage.css";

function Homepage({ closeModal }) {
  const [isOpen, setIsOpen] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    salary: "",
    startDate: "",
  });

  function handleInputChange(e) {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  }

  async function addEmployee(e) {
    e.preventDefault();
  
    try {
      const res = await fetch("http://localhost:5000/add-employee", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      const data = await res.json();
  
      // Handle server validation errors
      if (!res.ok) {
        alert(data.message); 
        return;
      }
  
      // Success
      const fetchRes = await fetch("http://localhost:5000/employees");
      const employeesData = await fetchRes.json();
      setEmployees(employeesData);
  
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        salary: "",
        startDate: "",
      });
  
      setIsOpen(false);
      alert("Employee added successfully");
  
    } catch (err) {
      console.error("REAL ERROR:", err);
      alert("Network or server error");
    }
  }
  
  

  const deleteEmployee = async (id) => {
    try {
      if (!window.confirm("Are you sure you want to delete this employee?")) {
        return;
      }

      const res = await fetch(`http://localhost:5000/delete-employee/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setEmployees(employees.filter((emp) => emp._id !== id));
        alert("Employee successfully deleted");
      } else {
        alert("Failed to delete employee");
      }
    } catch (err) {
      console.error("Error deleting employee:", error);
      alert("Error deleting employee");
    }
  };

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const res = await fetch("http://localhost:5000/employees");
        if (!res.ok) throw Error("Failed to load employees");

        const data = await res.json();
        setEmployees(data);
        console.log(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchEmployees();
  }, []);

  return (
    <div className="section">
      <h1 className="title">Employee Management Software</h1>
      <div className="action-btns">
        <Button variant="primary" size="md" onClick={() => setIsOpen(true)}>
          Add Employee
        </Button>

        <Button variant="secondary" size="sm">
          Logout
        </Button>
      </div>

      <br />
      <div className="table">
        {isLoading && (
          <div className="loading-icon-container">
            <CircularProgress />
          </div>
        )}
        {error && (
          <div className="error-text-container">
            <p>{error}</p>
          </div>
        )}
        {!isLoading && !error && (
          <table>
            <thead>
              <tr>
                <th className="no-column">No.</th>
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
                <tr key='no-employees'>
                  <td>No employees</td>
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
      <Modal openModal={isOpen} closeModal={() => setIsOpen(false)}>
        <div className="modal-overlay">
          <div className="modal">
            <div className="header">
              <h2>Add Employee</h2>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#000000"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-x-icon lucide-x"
                onClick={closeModal}
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </div>
            <div className="form-container">
              <form id="employeeForm" onSubmit={addEmployee}>
                <div className="form-group">
                  <label htmlFor="firstName">
                    First Name <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    placeholder="Enter first name"
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="lastName">
                    Last Name <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    placeholder="Enter last name"
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">
                    Email <span className="required">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="employee@example.com"
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="salary">
                    Salary <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    id="salary"
                    name="salary"
                    onChange={handleInputChange}
                    placeholder="$95,000"
                    required
                  />
                </div>

                {/* <div className="form-group">
                  <label htmlFor="date">
                    Start Date <span className="required">*</span>
                  </label>
                  <input
                    type="date"
                    id="startDate"
                    name="startDate"
                    onChange={handleInputChange}
                    required
                  />
                </div> */}

                <div className="button-group">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => setIsOpen(false)} // Add this
                    type="button"
                  >
                    Cancel
                  </Button>
                  <Button variant="primary" size="md">
                    Add Employee
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
