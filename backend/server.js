import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import UserRouter from "./Routes/UserRouter.js";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
dotenv.config();
const port = 5000;

app.use(cors()); // Then use cors middleware
app.use(cookieParser());
mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database connected");
  })
  .catch((error) => {
    console.error("Error connecting to the database:", error);
  });

app.use(express.json());

app.use("/api/user", UserRouter);

app.listen(port, () => {
  console.log(`Server is connected on port ${port}`);
});
