import { HfInference } from "@huggingface/inference";
import dotenv from "dotenv";

dotenv.config();

const hf = new HfInference(process.env.HUGGING_FACE_KEY);

/**
 * 
 * @param {String} 
 * @returns {Promise<number[]>}
 */

export const generateEmbending = async (text) => {
  try {
    const response = await hf.featureExtraction({
      model: "sentence-transformers/all-MiniLM-L6-v2",
      inputs: text,
    });
    return response;
  } catch (error) {
    console.log("Error while generating Embendings", error);
  }
};
