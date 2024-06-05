import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const url: string = process.env.MONGO_URI || "";

const connectDB = async () => {
  mongoose.set("strictQuery", true);

  await mongoose
    .connect(url)
    .then(() => {
      console.log("MongoDB Connected");
    })
    .catch((err) => {
      console.log(err);
    });
};

export { connectDB };
