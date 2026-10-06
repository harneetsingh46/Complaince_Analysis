import mongoose from "mongoose";
import { randomUUID } from "crypto";

const companySchema = new mongoose.Schema(
  {
    uuid: {
      type: String,
      default: () => randomUUID(),
      unique: true,
      index: true,
    },
    legalName: {
      type: String,
      required: true,
      trim: true,
    },
    dbaName: {
      type: String,
      required: true,
    },
    address: {
      street: String,
      city: String,
      state: String,
      zip: String,
      country: String,
    },

    //contact
    primaryContact: {
      name: String,
      email: {
        type: String,
        lowercase: true,
        trim: true,
      },
    },
    phoneNumber: String,
    website: String,
    // system fields
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Auth",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    deletedAt: {
      type: Date,
      default: null,
    },
    identifiers: {
      // usa/global
      fdafei: String,
      labellerCode: String,
      dunNumber: String,

      // indian/coroprate
      cin: String,
      gstin: String,
      pan: String,

      //indian regulartory
      cdsco: String,
      others: String,
    },
  },
  { timestamps: true },
);

export const Company = mongoose.model("Company", companySchema);
