import { Company } from "../model/organization.schema.js";

export const createCompany = async (req, res, next) => {
  try {
    const {
      legalName,
      dbaName,
      address,
      primaryContact,
      phoneNumber,
      website,
      identifiers,
    } = req.body;
    if (!legalName || !dbaName) {
      return res.status(400).json({
        message: "Legal Name and DbaName is required ",
      });
    }
    const isCompany = {
      $or: [{ dbaName }, { phoneNumber }, { website }],
    };
    const isCompanyExists = await Company.findOne(isCompany);
    if (isCompanyExists) {
      return res.status(400).json({
        message: "Company already exists!",
      });
    }
    const company = await Company.create({
      legalName,
      dbaName,
      address,
      primaryContact,
      phoneNumber,
      website,
      identifiers,
      createdBy: req.user.id,
    });
    return res.status(200).json({
      message: "Company created successfully !",
      data: company,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const getCompanies = async (req, res, next) => {
  try {
    const company = await Company.find({ createdBy: req.user.id });
    if (company.length === 0) {
      return res.status(400).json({
        message: "No Companies Found !",
      });
    }
    return res.status(200).json({
      message: "Companies Fetched !",
      data: company,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const getOneCompany = async (req, res, next) => {
  try {
    const {id} = req.params;
    const company = await Company.findById(id);
    if (!company) {
      return res.status(400).json({
        message: "No Company Found !",
      });
    }
    return res.status(200).json({
      message: "Comapany Fetched !",
      data: company,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
