import express from "express";
import {
  deleteUser,
  getUserById,
  registerUser,
  signin,
  signout,
  updateUser,
} from "../controller/auth.controller.js";
import { protect } from "../../utils/protect.js";

const router = express.Router();

//register
router.post("/register", registerUser);
router.post("/signin", signin);
router.get("/get-user", protect, getUserById);
router.patch("/update-user", protect, updateUser);
router.delete("/delete-user".protect, deleteUser);
router.post("/sign-out", signout);

export default router;
