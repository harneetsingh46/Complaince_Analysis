import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";
import multer from "multer";

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "Complaince_analysis",
    allowedFormats: ["jpg", "png", "jpeg", "pdf", "webp"],
  },
});
export const upload = multer({ storage });
