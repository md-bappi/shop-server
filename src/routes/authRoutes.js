const express = require("express");
const { signup, login } = require("../controllers/authControllers");
const {
  signupValidator,
  loginValidator,
} = require("../middlewares/userValidation");

const authRoute = express.Router();

authRoute.post("/signup", signupValidator, signup);
authRoute.post("/login", loginValidator, login);

module.exports = authRoute;
