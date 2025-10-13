const { errorResponse } = require("../controllers/ResponseControllers");

const signupValidator = async (req, res, next) => {
  try {
    const { fullName, email, password } = req.body;

    // Check for empty fields
    if (!fullName || !email || !password) {
      return errorResponse(res, {
        statusCode: 400,
        message: "All fields are required",
      });
    }

    // Full name length check
    if (fullName.length < 3) {
      return errorResponse(res, {
        statusCode: 400,
        message: "Full name too short",
      });
    }

    // Password length check
    if (password.length < 8) {
      return errorResponse(res, {
        statusCode: 400,
        message: "Password too weak",
      });
    }

    // Email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return errorResponse(res, {
        statusCode: 400,
        message: "Invalid email",
      });
    }

    next();
  } catch (error) {
    console.error(error);
    return errorResponse(res, {
      statusCode: 500,
      message: "Validation error",
    });
  }
};

const loginValidator = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Check for empty fields
    if (!email || !password) {
      return errorResponse(res, {
        statusCode: 400,
        message: "All fields are required",
      });
    }

    // Password length check
    if (password.length < 8) {
      return errorResponse(res, {
        statusCode: 400,
        message: "Password too weak",
      });
    }

    // Email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return errorResponse(res, {
        statusCode: 400,
        message: "Invalid email",
      });
    }

    next();
  } catch (error) {
    console.error(error);
    return errorResponse(res, {
      statusCode: 500,
      message: "Validation error",
    });
  }
};

module.exports = { signupValidator, loginValidator };
