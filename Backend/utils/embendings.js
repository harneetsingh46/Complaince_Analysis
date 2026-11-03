import { pipeline, env } from "@huggingface/transformers";

env.allowLocalModels = true;

let embeddingPipeline = null;

const getEmbeddingPipeline = async () => {
  if (!embeddingPipeline) {
    console.log("Loading local embedding model...");

    embeddingPipeline = await pipeline(
      "feature-extraction",
      "Xenova/all-MiniLM-L6-v2",
    );

    console.log("Embedding model loaded successfully");
  }

  return embeddingPipeline;
};

export const generateEmbedding = async (text) => {
  try {
    if (!text || typeof text !== "string") {
      throw new Error("Embedding input must be a non-empty string");
    }

    const extractor = await getEmbeddingPipeline();

    const result = await extractor(text, {
      pooling: "mean",
      normalize: true,
    });

    const vector = Array.from(result.data);

    if (vector.length !== 384) {
      throw new Error(`Expected 384 dimensions, received ${vector.length}`);
    }

    return vector;
  } catch (error) {
    console.error("Embedding generation failed:", error.message);
    throw error;
  }
};
