import express from "express";
import { protect } from "../../utils/protect.js";
import { createCompany, getCompanies, getOneCompany } from "../controller/organization.controller.js";

const router = express.Router();

router.post("/create-company", protect, createCompany);
router.get("/get-companies",protect,getCompanies)
router.get("/get/:id",protect,getOneCompany)

export default router;
