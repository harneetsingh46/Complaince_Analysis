import { randomUUID } from "crypto";
import mongoose from "mongoose";
import { type } from "os";

const productSchema = new mongoose.Schema(
  {
    uuid: {
      type: String,
      default: () => randomUUID(),
      unique: true,
      index: true,
    },
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true,
      index: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Auth",
    },

    //basic info

    productName: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    productCode: String,
    description: String,

    productType: {
      type: String,
      enum: [
        "drug",
        "medical_device",
        "software",
        "ai_system",
        "diagonistic",
        "other",
      ],
    },

    images: [
      {
        url: String,
        publicId: String,
      },
    ],

    //regulatory

    regulatory: {
      deviceClass: String,
      riskCategory: {
        type: String,
        enum: ["low", "medium", "high", "critical"],
      },
      intendedUse: String,
      market: [String],
      approvals: [
        {
          authority: String,
          approvalNumber: String,
          approvalDate: Date,
        },
      ],
    },
    complaineStatus: {
      type: String,
      enum: ["draft", "under_review", "complaint", "non_complaint"],
      default: "draft",
    },
    complainceScore: {
      type: Number,
      default: 0,
    },
    verctorIndexed: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    defaultAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true },
);

export const Product = mongoose.model("Product", productSchema);
