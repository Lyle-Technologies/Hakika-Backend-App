const express = require("express");
const router = express.Router();
const {
  getProducts,
  addProducts,
} = require("../controllers/productController");

router.get("/products", getProducts);
router.post("/:categoryId/products", addProducts);

module.exports = router;
