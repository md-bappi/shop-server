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

// all products
const allProducts = async (req, res, next) => {
  try {
    const products = await Product.find({});
    if (products.length === 0) {
      return errorResponse(res, {
        statusCode: 404,
        message: "No products found",
      });
    }

    // const path = `${req.protocol}://${req.get("host")}`;
    const host = `${req.protocol}://${req.get("host")}`;

    const allProducts = products.map((product) => {
      const { filename } = product.image;
      return (productData = {
        _id: product._id,
        title: product.title,
        description: product.description,
        category: product.category,
        image: {
          url: `${host}/uploads/${product.image.filename}`,
        },
        price: product.price,
      });
    });

    return successResponse(res, {
      statusCode: 200,
      message: "All products",
      payload: {
        allProducts,
      },
    });
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  addProduct,
  allProducts,
};
