import mongoose from "mongoose";

export const db = async () => {
  try {
    await mongoose.connect(process.env.MONO_URL);
    console.log("DATABASE Connected !");
  } catch (err) {
    console.log(err.message);
    process.exit(1);
  }
};
