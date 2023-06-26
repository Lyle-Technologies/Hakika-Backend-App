const express = require("express");
const router = express.Router();
const {
  getProducts,
  addProducts,
  singleProduct,
  eachCategoryProduct,
} = require("../controllers/productController");
const upload = require("../utils/multer");

router.get("/products", getProducts);
router.get("/products/:id", singleProduct);
router.get("/:categoryId/products", eachCategoryProduct);
router.post("/products", upload.single("image"), addProducts);

module.exports = router;
