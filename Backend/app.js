import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRouter from "./api/routes/auth.route.js";
const app = express();
dotenv.config();

//middlewares
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());

//routes
app.use("/authRouter", authRouter);

export default app;
