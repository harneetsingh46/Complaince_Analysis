import { Auth } from "../model/auth.schema.js";
import { genToken } from "../../utils/genToken.js";
import bcrypt from "bcryptjs";
export const registerUser = async (req, res, next) => {
  try {
    const { username, email, password, role } = req.body;
    if (!username || !email || !password || !role) {
      return res.status(400).json({
        message: "All fields are required !",
      });
    }
    const isUserExists = await Auth.findOne({ email });
    if (isUserExists) {
      return res.status(400).json({
        message: "User Already Exists !",
      });
    }
    const user = await Auth.create({
      username,
      email,
      password,
      role,
    });
    res.status(200).json({
      message: "User Registered Successfully !",
      data: {
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        message: "All Fields are required !",
      });
    }
    const user = await Auth.findOne({
      email,
    });
    if (!user) {
      return res.status(404).json({
        message: "user not found !",
      });
    }
    const isPassword = await user.comparePassword(password);
    if (!isPassword) {
      return res.status(400).json({
        message: "Password is incorrect",
      });
    }
    const token = await genToken(user._id, user.username, user.role);
    return res
      .status(200)
      .cookie("token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000,
      })
      .json({
        message: "User Signin Successfull !",
        data: {
          _id: user._id,
          username: user.username,
          email: user.email,
          role: user.role,
        },
      });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const getUserById = async (req, res, next) => {
  try {
    const id = req.user._id;
    const user = await Auth.findById(id);
    if (!user) {
      return res.status(400).json({
        message: "user not found , please login !",
      });
    }
    return res.status(200).json({
      message: "User Fetched Successfull !",
      data: {
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
//update
export const updateUser = async (req, res, next) => {
  try {
    const { username, email, password, role } = req.body;
    const id = req.params;
    const user = await Auth.findById(id);
    if (!user) {
      return res.status(400).json({
        message: "User not found !",
      });
    }
    if (username) {
      user.username = username;
    }
    if (email) {
      user.email = email;
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    if (password) {
      user.password = hashedPassword;
    }
    if (role) {
      user.role = role;
    }
    await user.save();
    return res.status(200).json({
      message: "User Updated Successfully !",
      data: {
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
//delete
export const deleteUser = async (req, res, next) => {
  try {
    const id = req.params;
    const user = await Auth.findByIdAndDelete(id);
    return res.status(200).json({
      message: "User Deleted Successfull !",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

//signout
export const signout = async (req, res, next) => {
  try {
    return res.clearCookie("token").status(200).json({
      message: "SignOut Successfull !",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
