const successResponse = async (
  res,
  { statusCode = 200, message = "success", payload = {} }
) => {
  res.status(statusCode).json({
    success: true,
    message,
    payload,
  });
};
const errorResponse = async (
  res,
  { statusCode = 404, message = "Internal Server Error" }
) => {
  res.status(statusCode).json({
    success: false,
    message,
  });
};

module.exports = {
  successResponse,
  errorResponse,
};
