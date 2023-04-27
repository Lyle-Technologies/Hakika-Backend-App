const express = require("express");
const router = express.Router();
const {
  getProducts,
  addProducts,
  singleProduct,
} = require("../controllers/productController");

router.get("/api/products", getProducts);
router.get("/api/products/:id", singleProduct);
router.post("/api/products", addProducts);

module.exports = router;
