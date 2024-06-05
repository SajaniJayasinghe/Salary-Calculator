import express, { Express } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/database.config";
dotenv.config();

const app: Express = express();

app.use(cors());
app.use(express.json());

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
