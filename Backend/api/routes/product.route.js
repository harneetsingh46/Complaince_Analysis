import express from "express";
import { upload } from "../../utils/multer.js";
import { createProduct, getAllProducts } from "../controller/product.controller.js";
import { isUser, protect } from "../../utils/protect.js";

const router = express.Router();

router.post("/create", protect , isUser ,upload.array("images",5),createProduct);
router.get("/get-product",protect ,getAllProducts)

export default router;
