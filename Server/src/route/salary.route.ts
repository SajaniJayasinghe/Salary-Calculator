import { Router } from "express";
import {
  createSalary,
  getSalary,
  deleteEarningOrDeduction,
} from "../controller/salary.controller";

const Salaryrouter = Router();

// Create Salary
Salaryrouter.post("/create", createSalary);
Salaryrouter.get("/:id", getSalary);
Salaryrouter.delete("/delete", deleteEarningOrDeduction);

export default Salaryrouter;
