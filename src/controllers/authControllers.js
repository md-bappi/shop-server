const comparePassword = require("../helper/comparePassword");
const hashPassword = require("../helper/hashPassword");
const generateToken = require("../helper/jwt");
const User = require("../models/userModel");
const { JWT_SECRET_KEY } = require("../secret");
const { successResponse, errorResponse } = require("./ResponseControllers");

const signup = async (req, res, next) => {
  try {
    const { fullName, email, password } = req.body;

    // user exists
    const userExist = await User.findOne({ email });
    if (userExist) {
      return errorResponse(res, {
        statusCode: 409,
        message: "User already exists!",
      });
    }

    // hash password
    const hashedPassword = await hashPassword(password);

    // new user create
    const user = new User({
      fullName,
      email,
      password: hashedPassword,
    });

    // user save in db
    await user.save();

    // token data
    const userPayload = {
      id: user._id,
      fullName: user.fullName,
      email: user.email,
    };

    // create token
    const token = await generateToken(userPayload, JWT_SECRET_KEY);

    res.cookie("access-token", token, {
      httpOnly: true, // protect from XSS
      secure: false, // ❌ no HTTPS in local dev
      sameSite: "lax", // allows frontend calls from localhost:3000
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return successResponse(res, {
      statusCode: 201,
      message: "Signup successfull",
      payload: {
        ...userPayload,
      },
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return errorResponse(res, {
        statusCode: 401,
        message: "Invalid credentials",
      });
    }

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return errorResponse(res, {
        statusCode: 401,
        message: "Invalid credentials", // wrong password
      });
    }

    // token data
    const userPayload = {
      id: user._id,
      fullName: user.fullName,
      email: user.email,
    };

    const token = await generateToken(userPayload, JWT_SECRET_KEY, "7d");

    res.cookie("access-token", token, {
      httpOnly: true, // protect from XSS
      secure: false, // ❌ no HTTPS in local dev
      sameSite: "lax", // allows frontend calls from localhost:3000
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return successResponse(res, {
      statusCode: 201,
      message: "Login successfull",
      payload: {
        ...userPayload,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  signup,
  login,
};
