import express from "express";
import { createFramework, getFramework } from "../controller/framework.controller.js";
import { isAdmin, protect } from "../../utils/protect.js";

const router = express.Router();

router.post("/create", protect, isAdmin, createFramework);
router.get("/frameworks", protect, isAdmin, getFramework)

export default router;
