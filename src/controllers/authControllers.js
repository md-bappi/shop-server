const hashPassword = require("../helper/hashPassword");
const User = require("../models/userModel");
const { successResponse, errorResponse } = require("./ResponseControllers");

const signup = async (req, res, next) => {
  try {
    const { fullName, email, password } = req.body;

    const userExist = await User.findOne({ email });
    if (userExist) {
      return errorResponse(res, {
        statusCode: 409,
        message: "User already exists!",
      });
    }

    const hashedPassword = await hashPassword(password);

    const newUser = {
      fullName,
      email,
      password: hashedPassword,
    };

    const user = new User(newUser);
    // await user.save()

    return successResponse(res, {
      statusCode: 201,
      message: "Signup successfull",
      payload: {
        ...user,
      },
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};

module.exports = {
  signup,
  login,
};
