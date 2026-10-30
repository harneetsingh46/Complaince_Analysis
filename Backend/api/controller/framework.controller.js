import { Framework } from "../model/framework.schema.js";
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
      !industry ||
      !appliesTo ||
      !controls
    ) {
      return res.status(400).json({
        message: "All fields are required !",
      });
    }

    const findFramework = {
      $or: [{ shortCode }, { version }],
    };

    const isFrameworkExists = await Framework.findOne(findFramework);

    if (isFrameworkExists) {
      return res.status(400).json({
        message: "Framework already exists !",
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
      createdBy: req.user._id,
    });
    return res.status(200).json({
      message: "Framework Created Successfully !",
      data: framework,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const getFramework = async (req, res, next) => {
  try {
    const framework = await Framework.find({ isActive:true });
    if (framework.lenth === 0) {
      return res.status(400).json({
        message: "No Framework Found!",
      });
    }
    return res.status(200).json({
      message: "Framework(s) Fetched Successfully !",
      data: framework,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
