// import { useState } from "react";
import Button from "../ButtonComponent/Button";
import "./Modal.css";

function Modal({ openModal, closeModal }) {
  if (!openModal) return null;

  return (
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
            stroke-width="1.75"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-x-icon lucide-x"
            onClick={closeModal}
          >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </div>
        <div class="form-container">        
        <form id="employeeForm">
            <div class="form-group">
                <label for="firstName">
                    First Name <span class="required">*</span>
                </label>
                <input 
                    type="text" 
                    id="firstName" 
                    name="firstName" 
                    placeholder="Enter first name"
                    required
                />
            </div>

            <div class="form-group">
                <label for="lastName">
                    Last Name <span class="required">*</span>
                </label>
                <input 
                    type="text" 
                    id="lastName" 
                    name="lastName" 
                    placeholder="Enter last name"
                    required
                />
            </div>

            <div class="form-group">
                <label for="email">
                    Email <span class="required">*</span>
                </label>
                <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    placeholder="employee@example.com"
                    required
                />
            </div>

            <div class="form-group">
                <label for="salary">
                    Salary <span class="required">*</span>
                </label>
                <input 
                    type="text" 
                    id="salary" 
                    name="salary" 
                    placeholder="$95,000"
                    required
                />
            </div>

            <div class="form-group">
                <label for="date">
                    Start Date <span class="required">*</span>
                </label>
                <input 
                    type="date" 
                    id="date" 
                    name="date" 
                    required
                />
            </div>

            <div class="button-group">
                <Button variant="secondary" size="sm">Cancel</Button>
                <Button variant="primary" size="md">Add Customer</Button>
            </div>
        </form>
    </div>
      </div>
    </div>
  );
}

export default Modal;
