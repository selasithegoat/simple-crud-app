import { Link } from "react-router";
import Button from "../components/ButtonComponent/Button";

import "./Homepage.css";

function Homepage() {
  return (
    <div className="section">
      <h1 className="title">Employee Management Software</h1>
      <div className="action-btns">
        <Link>
          <Button variant="primary" size="md">
            Add Employee
          </Button>
        </Link>

        <Button variant="secondary" size="sm">
          Logout
        </Button>
      </div>
      <br />
      <div className="table">
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
            <tr>
              <td>1</td>
              <td>Susan</td>
              <td>Jordon</td>
              <td>susan@example.com</td>
              <td>$95,000</td>
              <td>2019-04-11</td>
              <td>
                <div class="actions">
                  <Button
                    variant="secodary"
                    size="sm"
                    className="table-btn
                    "
                  >
                    Edit
                  </Button>
                  <Button
                    variant="secodary"
                    size="sm"
                    className="table-btn
                    "
                  >
                    Delete
                  </Button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Homepage;
