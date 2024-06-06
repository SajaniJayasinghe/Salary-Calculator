import { Request, Response } from "express";
import SalaryCalculator from "../model/salarycalculator.model"; // Correct import path
import BadRequestError from "../errors/BadRequestError";
import NotFoundError from "../errors/NotFoundError";

// Create Salary
const createSalary = async (req: Request, res: Response) => {
  try {
    const { basicSalary, earnings, deductions } = req.body;

    const salary = new SalaryCalculator({
      basicSalary,
      earnings,
      deductions,
    });

    await salary.save();
    res.status(200).json({ salary });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export { createSalary };
