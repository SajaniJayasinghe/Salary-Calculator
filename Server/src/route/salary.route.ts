import { Router } from "express";
import { createSalary } from "../controller/salary.controller";

const Salaryrouter = Router();

// Create Salary
Salaryrouter.post("/create", createSalary);

export default Salaryrouter;
