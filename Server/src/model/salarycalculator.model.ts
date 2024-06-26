import mongoose from "mongoose";

const earningSchema = new mongoose.Schema({
  name: String,
  amount: Number,
  epfApplicable: Boolean,
  etfApplicable: Boolean,
});

const deductionSchema = new mongoose.Schema({
  name: String,
  amount: Number,
  epfApplicable: Boolean,
  etfApplicable: Boolean,
});

const salarySchema = new mongoose.Schema({
  basicSalary: Number,
  earnings: [earningSchema],
  deductions: [deductionSchema],
});

export default mongoose.model("SalaryCalculator", salarySchema);
