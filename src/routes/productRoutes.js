const express = require("express");
const { addProduct } = require("../controllers/productControllers");
const upload = require("../middlewares/multer");
const productRoute = express.Router();

// add a new product
productRoute.post("/add-product", upload.single("image"), addProduct);

module.exports = productRoute;
