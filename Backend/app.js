import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRouter from "./api/routes/auth.route.js";
import orgRouter from "./api/routes/organization.route.js"
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
app.use("/orgRouter",orgRouter)

export default app;
