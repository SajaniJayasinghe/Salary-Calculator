import express, { Express, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/database.config";
import errorMiddleware from "./errors/error-middleware/error.middleware";
import NotFoundError from "./errors/NotFoundError";
import constants from "../src/constants";
import SalaryRouter from "./route/salary.route";
require("express-async-errors");
dotenv.config();

const app: Express = express();

app.use(cors());
app.use(express.json());

// import routes
app.use(constants.API.PREFIX.concat("/salary"), SalaryRouter);

//404 not found route
app.all("*", async (req: Request, res: Response) => {
  throw new NotFoundError("API endpoint not found!");
});

app.use(errorMiddleware);

const start = async () => {
  const port = process.env.PORT || 5000;
  try {
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
      connectDB();
    });
  } catch (error) {
    console.log(error);
  }
};

start();
