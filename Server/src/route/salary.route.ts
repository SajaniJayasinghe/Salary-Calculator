import { Router } from "express";
import { createSalary, getSalary } from "../controller/salary.controller";

const Salaryrouter = Router();

// Create Salary
Salaryrouter.post("/create", createSalary);
Salaryrouter.get("/:id", getSalary);

export default Salaryrouter;
