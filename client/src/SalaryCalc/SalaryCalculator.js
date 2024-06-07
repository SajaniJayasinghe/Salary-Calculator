import React, { useState } from "react";
import "../index.css";
import RefreshIcon from "@mui/icons-material/Refresh";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";

const SalaryCalculator = () => {
  const [basicSalary, setBasicSalary] = useState("");
  const [earnings, setEarnings] = useState([]);
  const [deductions, setDeductions] = useState([]);
  const [results, setResults] = useState(null);
  const [createdId, setCreatedId] = useState(null);

  //Add earning
  const handleAddEarning = () => {
    setEarnings([...earnings, { name: "", amount: "", epfApplicable: false }]);
  };

  //Add deduction
  const handleAddDeduction = () => {
    setDeductions([...deductions, { name: "", amount: "" }]);
  };

  //Remove earning and deduction
  const handleRemoveEarning = (index) => {
    const newEarnings = [...earnings];
    newEarnings.splice(index, 1);
    setEarnings(newEarnings);
  };

  //Reset all the values
  const handleReset = () => {
    setBasicSalary("");
    setEarnings([]);
    setDeductions([]);
    setResults(null);
  };

  const handleCalculateSalary = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8080/api/v1/salary/create",
        {
          basicSalary,
          earnings,
          deductions,
        }
      );

      // Get the ID of the newly created salary from the response
      const createdSalaryId = res.data.id;

      // Set the created salary ID in the state
      setCreatedId(createdSalaryId);

      // Fetch the salary details using the created ID
      const salaryRes = await axios.get(
        `http://localhost:8080/api/v1/salary/${createdSalaryId}`
      );
      // Update the results state with the fetched data
      setResults(salaryRes.data);
    } catch (error) {
      console.error("Error calculating salary:", error);
    }
  };

  return (
    <div className="App">
      <div className="container">
        <div className="card salary-form">
          <div className="header">
            <h1>Salary Calculator</h1>
            <div style={{ display: "flex", alignItems: "center" }}>
              <RefreshIcon color="primary" onClick={handleReset} />
              <span
                style={{
                  marginLeft: "5px",
                  color: "#1974D2",
                  fontSize: "15px",
                  fontWeight: "bold",
                }}
              >
                Reset
              </span>
            </div>
          </div>

          <div className="input-group">
            <div>
              <label style={{ marginRight: "20px", display: "block" }}>
                Basic Salary:{" "}
              </label>
            </div>
            <div>
              <input
                type="text"
                style={{ display: "block", width: "50%" }}
                value={basicSalary}
                onChange={(e) => setBasicSalary(e.target.value)}
              />
            </div>
          </div>

          <h2>Earnings</h2>
          <div style={{ marginBottom: "10px", marginTop: "-14px" }}>
            <span
              style={{ marginRight: "20px", color: "gray", fontSize: "12px" }}
            >
              Allowance, Fixed Allowance, Bonus and etc.
            </span>
          </div>

          {/* Mapping over earnings */}
          {/* Display earning inputs */}
          {earnings.map((earning, index) => (
            <div key={index} className="earning">
              <input
                type="text"
                name="name"
                value={earning.name}
                placeholder="Pay Details (Title)"
                onChange={(e) => {
                  const updatedEarnings = [...earnings];
                  updatedEarnings[index].name = e.target.value;
                  setEarnings(updatedEarnings);
                }}
              />
              <input
                type="text"
                name="amount"
                value={earning.amount}
                placeholder="Amount"
                onChange={(e) => {
                  const updatedEarnings = [...earnings];
                  updatedEarnings[index].amount = e.target.value;
                  setEarnings(updatedEarnings);
                }}
              />
              <CloseIcon
                fontSize="medium"
                style={{
                  color: "black",
                  cursor: "pointer",
                  backgroundColor: "#DADBDD",
                  borderRadius: "50%",
                }}
                onClick={() => handleRemoveEarning(index)}
              />
              <label>
                <input
                  type="checkbox"
                  name="epfApplicable"
                  checked={earning.epfApplicable}
                  onChange={(e) => {
                    const updatedEarnings = [...earnings];
                    updatedEarnings[index].epfApplicable = e.target.checked;
                    setEarnings(updatedEarnings);
                  }}
                />
                EPF/ETF
              </label>
            </div>
          ))}

          <div style={{ display: "flex", alignItems: "center" }}>
            <IconButton
              onClick={handleAddEarning}
              style={{ color: "#0059FF", fontWeight: "bold" }}
            >
              <AddIcon />
            </IconButton>
            <span style={{ color: "#0059FF", fontWeight: "bold" }}>
              Add New Allowance
            </span>
          </div>

          <h2>Deductions</h2>
          <div style={{ marginBottom: "10px", marginTop: "-14px" }}>
            <span
              style={{ marginRight: "20px", color: "gray", fontSize: "12px" }}
            >
              Salary Advances, Loan Deduction and all
            </span>
          </div>

          {/* Mapping over deductions */}
          {/* Display deduction inputs */}
          {deductions.map((deduction, index) => (
            <div key={index} className="deduction">
              <input
                type="text"
                name="name"
                value={deduction.name}
                placeholder="Deduction Name"
                onChange={(e) => {
                  const updatedDeductions = [...deductions];
                  updatedDeductions[index].name = e.target.value;
                  setDeductions(updatedDeductions);
                }}
              />
              <input
                type="text"
                name="amount"
                value={deduction.amount}
                placeholder="Amount"
                onChange={(e) => {
                  const updatedDeductions = [...deductions];
                  updatedDeductions[index].amount = e.target.value;
                  setDeductions(updatedDeductions);
                }}
              />
              <CloseIcon
                fontSize="medium"
                style={{
                  color: "black",
                  cursor: "pointer",
                  backgroundColor: "#DADBDD",
                  borderRadius: "50%",
                }}
                onClick={() => handleRemoveEarning(index)}
              />
            </div>
          ))}

          <div style={{ display: "flex", alignItems: "center" }}>
            <IconButton
              onClick={handleAddDeduction}
              style={{ color: "#0059FF", fontWeight: "bold" }}
            >
              <AddIcon />
            </IconButton>
            <span style={{ color: "#0059FF", fontWeight: "bold" }}>
              Add New Deduction
            </span>
          </div>
          <div
            style={{
              textAlign: "center",
              marginTop: "20px",
              marginLeft: "80%",
            }}
          >
            <button onClick={handleCalculateSalary}>Calculate</button>
          </div>
        </div>

        {/* Results Card */}
        <div className="card results">
          <h2>Your Salary</h2>
          <div className="result-row">
            <p style={{ color: "#808080", fontWeight: "bold" }}>Items</p>
            <p style={{ color: "#808080", fontWeight: "bold" }}>Amount</p>
          </div>
          <div className="result-row">
            <p style={{ marginTop: "20px" }}>Basic Salary</p>
            <p style={{ marginTop: "20px" }}>
              {results ? results.basicSalary : ""}
            </p>
          </div>
          <div className="result-row">
            <p>Gross Earnings</p>
            <p>{results ? results.grossEarnings : ""}</p>
          </div>
          <div className="result-row">
            <p>Gross Deduction</p>
            <p>{results ? results.grossDeduction : ""}</p>
          </div>
          <div className="result-row">
            <p>Employee EPF (8%)</p>
            <p>{results ? results.employeeEPF : ""}</p>
          </div>
          <div className="result-row">
            <p>APIT</p>
            <p>{results ? results.APIT : ""}</p>
          </div>
          <div
            style={{
              marginTop: "20px",
              border: "1px solid #C0C6C7",
              padding: "10px",
              borderRadius: "5px",
            }}
          >
            <div className="result-row">
              <p>Net Salary (Take Home)</p>
              <p>{results ? results.netSalary : ""}</p>
            </div>
          </div>

          <div style={{ marginTop: "20px" }}>
            <h3>Contribution from the Employer</h3>
          </div>
          <div className="result-row">
            <p>Employer EPF (12%)</p>
            <p>{results ? results.employerEPF : ""}</p>
          </div>
          <div className="result-row">
            <p>Employer ETF (3%)</p>
            <p>{results ? results.employerETF : ""}</p>
          </div>
          <div className="result-row">
            <p>CTC (Cost to Company)</p>
            <p>{results ? results.CTC : ""}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalaryCalculator;
