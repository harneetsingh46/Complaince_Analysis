import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRouter from "./api/routes/auth.route.js";
import orgRouter from "./api/routes/organization.route.js"
import productRouter from "./api/routes/product.route.js"
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
app.use("/auth", authRouter);
app.use("/organization",orgRouter)
app.use("/product",productRouter)

export default app;
