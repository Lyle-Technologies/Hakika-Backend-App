const Product = require("../models/productModel");
const Category = require("../models/categoryModel");
const cloudinary = require("../utils/cloudinary");

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
    const { categories, name, description, price } = req.body;
    //find the category based on the provided category name

    const category = await Category.findOne({ name: categories });

    if (!category) {
      return res.status(400).json({ message: "Invalid category" });
    }
    // Upload image to cloudinary
    const result = await cloudinary.uploader.upload(req.file.path);

    // Create the new product object
    const product = new Product({
      name,
      description,
      price,
      category: category._id, // allocate the product with the resolved category
      imageLink: result.secure_url,
    });

    // save the product details in the Database.

    const savedProduct = await product.save();

    category.products.push(savedProduct._id);

    // saved the updated category
    await category.save();

    res.status(201).json(savedProduct);
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
