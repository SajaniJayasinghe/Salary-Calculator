import { Request, Response } from "express";
import SalaryCalculator from "../model/salarycalculator.model";
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

// Get Salary
const getSalary = async (req: Request, res: Response) => {
  try {
    const salary = await SalaryCalculator.findById(req.params.id);

    if (!salary) {
      throw new NotFoundError("Salary not found");
    }

    // Initialize totalEarnings and totalEarningsForEPF with basic salary or default to 0
    let basicSalary: number = salary.basicSalary || 0;
    let totalEarnings: number = basicSalary;
    let totalEarningsForEPF: number = basicSalary;

    salary.earnings.forEach((earning: any) => {
      totalEarnings += earning.amount;
      if (earning.epfApplicable) {
        totalEarningsForEPF += earning.amount;
      }
    });

    let grossDeduction = 0;
    salary.deductions.forEach((deduction: any) => {
      grossDeduction += deduction.amount;
    });

    const grossEarnings = totalEarnings - grossDeduction;
    const grossSalaryForEPF = totalEarningsForEPF - grossDeduction;

    const employeeEPF = grossSalaryForEPF * 0.08;
    const employerEPF = grossSalaryForEPF * 0.12;
    const employerETF = grossSalaryForEPF * 0.03;
    const APIT = grossEarnings * 0.18 - 25500;
    const netSalary = grossEarnings - employeeEPF - APIT;

    const CTC = grossEarnings + employerEPF + employerETF;

    res.json({
      basicSalary,
      grossEarnings,
      grossDeduction,
      employeeEPF,
      employerEPF,
      employerETF,
      APIT,
      netSalary,
      CTC,
    });
  } catch (err) {
    if (err instanceof NotFoundError) {
      res.status(404).json({ message: err.message });
    } else {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
};

// Delete Earning or Deduction
const deleteEarningOrDeduction = async (req: Request, res: Response) => {
  try {
    const { id, type, itemId } = req.body;
    let salary = await SalaryCalculator.findById(id);

    if (!salary) {
      throw new NotFoundError("Salary not found");
    }

    if (type === "earning") {
      salary.earnings.remove(itemId);
    } else if (type === "deduction") {
      salary.deductions.remove(itemId);
    } else {
      throw new BadRequestError(
        "Invalid type. Must be 'earning' or 'deduction'"
      );
    }

    await salary.save();
    res.status(200).json(salary);
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export { createSalary, getSalary, deleteEarningOrDeduction };
