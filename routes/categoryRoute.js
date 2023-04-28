const express = require("express");
const {
  addCategories,
  getCategories,
} = require("../controllers/categoryController");
const router = express.Router();

router.post("/", addCategories);
router.get("/", getCategories);

module.exports = router;
