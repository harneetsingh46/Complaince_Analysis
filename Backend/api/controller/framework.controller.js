import { randomUUID } from "crypto";
import { Framework } from "../model/framework.schema.js";
import { generateEmbedding } from "../../utils/embendings.js";
import { chunkFramework } from "../../utils/chunking.js";
import qdrantClient from "../../config/qdrant.js";

export const createFramework = async (req, res, next) => {
  try {
    const {
      name,
      shortCode,
      description,
      authority,
      country,
      version,
      industry,
      appliesTo,
      controls,
    } = req.body;
    if (
      !name ||
      !shortCode ||
      !description ||
      !authority ||
      !country ||
      !version ||
      !industry ||
      !appliesTo ||
      !controls
    ) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }
    const findFramework = {
      $or: [{ shortCode }, { version }],
    };
    const IsframeworkExist = await Framework.findOne(findFramework);
    if (IsframeworkExist) {
      return res.status(400).json({
        message: "Framework already exists",
      });
    }
    const framework = await Framework.create({
      name,
      shortCode,
      description,
      authority,
      country,
      version,
      industry,
      appliesTo,
      controls,
      createdBy: req.user.id,
    });

    //vector db part
    try {
      const chunks = await chunkFramework(framework);

      for (const chunk of chunks) {
        const vector = await generateEmbedding(chunk.text);

        if (!Array.isArray(vector) || vector.length !== 384) {
          throw new Error("Invalid embedding vector");
        }

        await qdrantClient.upsert("frameworks", {
          wait: true,
          points: [
            {
              id: randomUUID(),
              vector,
              payload: {
                text: chunk.text,
                ...chunk.metadata,
              },
            },
          ],
        });
      }

      console.log("Framework successfully stored in Qdrant");
    } catch (vectorErr) {
      console.log(vectorErr);
      console.error("Failed to save in vector DB:");
    }
    return res.status(201).json({
      data: framework,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

export const getFramework = async (req, res, next) => {
  try {
    const framework = await Framework.find({ isActive: true });
    if (!framework || framework.length === 0) {
      return res.status(400).json({
        message: "No framework Exists",
      });
    }
    return res.status(200).json({
      data: framework,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};
