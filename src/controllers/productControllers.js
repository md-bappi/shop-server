const Product = require("../models/productModel");
const { successResponse, errorResponse } = require("./ResponseControllers");

// add a new product
const addProduct = async (req, res, next) => {
  try {
    const { title, description, category, price } = req.body;
    const file = req.file;

    if (!title || !description || !category || !price || !file) {
      return errorResponse(res, {
        statusCode: 400,
        message: "All fields are required",
      });
    }

    const newProduct = new Product({
      title,
      description,
      category,
      image: {
        path: file.path,
        filename: file.filename,
      },
      price,
    });

    await newProduct.save();

    return successResponse(res, {
      statusCode: 201,
      message: "Product uploaded successfully",
      payload: {
        newProduct,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  addProduct,
};
