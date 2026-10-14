import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";
import multer from "multer";

const storage = CloudinaryStorage({
  cloudinary,
  params: {
    folder: "Protocol_analysis",
    allowed_formats: ["jpg", "png", "jpeg", "pdf", "webp"],
  },
});
export const upload = multer({ storage });
