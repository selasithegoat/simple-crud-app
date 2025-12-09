import { useState, useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "../components/ButtonComponent/Button";
import Modal from "../components/Modal/Modal";

import "./Homepage.css";

function Homepage() {
  const [isOpen, setIsOpen] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [error, setError] = useState(null);

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
      <Modal openModal={isOpen} closeModal={() => setIsOpen(false)} />
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
                <tr>
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
    </div>
  );
}

export default Homepage;
