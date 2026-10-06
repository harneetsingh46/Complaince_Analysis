import jwt from "jsonwebtoken";
import { Auth } from "../api/model/auth.schema.js";

export const protect = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(400).json({
        message: "Unauthorized !",
      });
    }
    const decoded = await jwt.verify(token, process.env.SECRET_KEY);
    const user = await Auth.findById({ _id: decoded.id }).select("-password");
    if (!user) {
      return res.status(400).json({
        message: "User not Found !",
      });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(500).json({
      messsage: "Invaild token",
    });
  }
};

export const isAdmin = async (req, res, next) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({
        message: "Access Denied",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      messsage: "Invaild token",
    });
  }
};
export const isUser = async (req, res, next) => {
  try {
    if (req.user.role !== "user") {
      return res.status(403).json({
        message: "Access Denied",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      messsage: "Invaild token",
    });
  }
};
