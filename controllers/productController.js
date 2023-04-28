const Product = require("../models/productModel");
const Category = require("../models/categoryModel");

const getProducts = async (req, res) => {
  try {
    const all = await Product.find({});
    res.status(200).json(all);
  } catch (error) {
    console.log(error);
  }
};

const eachCategoryProduct = async (req, res) => {
  const { categoryId } = req.params;
  try {
    const targetedCategory = await Category.findById(categoryId).populate(
      "products"
    );
    if (!targetedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.json(targetedCategory.products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const singleProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findById(id);
    res.json(product);
  } catch (error) {
    console.log(error);
  }
};

const addProducts = async (req, res) => {
  try {
    const { name, imageLink, price, description } = req.body;
    const { categoryId } = req.params;
    const targetedCategory = await Category.findById(categoryId);
    if (!targetedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }
    const newProduct = await Product.create({
      name,
      imageLink,
      price,
      description,
      category: targetedCategory._id,
    });
    await newProduct.save();
    targetedCategory.products.push(newProduct);
    await targetedCategory.save();
    res.status(201).json({ message: `${newProduct.name} Added Successfuly` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getProducts,
  addProducts,
  singleProduct,
  eachCategoryProduct,
};
