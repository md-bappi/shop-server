const express = require("express");
const { PORT } = require("./secret");
const cors = require("cors");
const createError = require("http-errors");
const authRoute = require("./routes/authRoutes");
const { errorResponse } = require("./controllers/ResponseControllers");
const connectDB = require("./config/db");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoute);

// client error handling
app.use((req, res, next) => {
  next(createError(404, "Route Not Found"));
});

// server error handling
app.use((err, req, res) => {
  return errorResponse(res, {
    statusCode: err.status || 500,
    message: err.message || "Internal Server Error",
  });
});

app.listen(PORT, async () => {
  console.log(`Server is running on port : ${PORT}`);
  await connectDB();
});
