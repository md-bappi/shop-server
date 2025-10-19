const express = require("express");
const {
  addProduct,
  allProducts,
} = require("../controllers/productControllers");
const upload = require("../middlewares/multer");
const productRoute = express.Router();

// add a new product
productRoute.post("/add-product", upload.single("image"), addProduct);

// get all products
productRoute.get("/", allProducts);

module.exports = productRoute;
