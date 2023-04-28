const express = require("express");
const router = express.Router();
const {
  getProducts,
  addProducts,
  singleProduct,
} = require("../controllers/productController");

router.get("/products", getProducts);
router.get("/products/:id", singleProduct);
router.post("/:categoryId/products", addProducts);

module.exports = router;
