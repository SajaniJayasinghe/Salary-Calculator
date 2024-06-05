import express, { Express, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/database.config";
import errorMiddleware from "./errors/error-middleware/error.middleware";
require("express-async-errors");
dotenv.config();

const app: Express = express();

app.use(cors());
app.use(express.json());

app.all("/", async (req: Request, res: Response) => {
  throw new Error("An error occurred");
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
