const express = require("express");
const { PORT } = require("./secret");
const cors = require("cors");
const path = require("path");
const morgan = require("morgan");
const createError = require("http-errors");
const authRoute = require("./routes/authRoutes");
const { errorResponse } = require("./controllers/ResponseControllers");
const connectDB = require("./config/db");
const cookieParser = require("cookie-parser");
const rateLimit = require("express-rate-limit");
const productRoute = require("./routes/productRoutes");

const app = express();

const rateLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 100,
  message: "Too many requests, please try again later after 5 minutes",
});

// middlewares
// const allowedOrigins = ["http://localhost:5000", "http://localhost:3000"];

// app.use(
//   cors({
//     origin: (origin, callback) => {
//       console.log(origin);
//       if (!origin || allowedOrigins.includes(origin)) {
//         callback(null, true);
//       } else {
//         callback(new Error("Not allowed by CORS"));
//       }
//     },
//   })
// );

// middlewares
app.use(morgan("dev"));
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    // credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(rateLimiter);
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

// api routes
app.use("/api/auth", authRoute);
app.use("/api/v1/products", productRoute);

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

// server listening
app.listen(PORT, async () => {
  console.log(`Server is running on port : ${PORT}`);
  await connectDB();
});
