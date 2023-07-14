const express = require("express");
const router = express.Router();
const {
  getProducts,
  singleProduct,
  eachCategoryProduct,
  uploadProduct,
} = require("../controllers/productController");
const upload = require("../utils/multer");

router.get("/products", getProducts);
router.get("/products/:id", singleProduct);
router.get("/:categoryId/products", eachCategoryProduct);
router.post("/upload", upload.single("image"), uploadProduct);

module.exports = router;
