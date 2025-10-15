const Product = require("../models/productModel");
const { successResponse } = require("./ResponseControllers");

const uploadProduct = async (req, res, next) => {
  try {
    const { title, description, price, category, stock, image } = req.body;

    const newProduct = new Product({
      title,
      description,
      price,
      category,
      stock,
      images: image ? [image] : [],
    });

    // await newProduct.save();

    return successResponse(res, {
      statusCode: 201,
      message: "Product uploaded successfully",
      payload: {
        ...newProduct,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  uploadProduct,
};
