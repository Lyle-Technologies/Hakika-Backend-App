const express = require("express");
const router = express.Router();
const {
  getProducts,
  addProducts,
  singleProduct,
  eachCategoryProduct
} = require("../controllers/productController");

router.get("/products", getProducts);
router.get("/products/:id", singleProduct);
router.get("/:categoryId/products", eachCategoryProduct)
router.post("/:categoryId/products", addProducts);

module.exports = router;
