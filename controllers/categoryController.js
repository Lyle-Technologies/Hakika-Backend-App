const Category = require("../models/categoryModel");

const addCategories = async (req, res) => {
  try {
    const { name, description, categoryImageLink } = req.body;
    const category = await Category.create({
      name,
      description,
      categoryImageLink,
    });

    res.status(201).json({ message: `${category.name} added Succesfully` });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Failed to add Category" });
  }
};

const getCategories = async (req, res) => {
  try {
    const categories = await Category.find({});
    res.status(200).json(categories);
  } catch (error) {
    console.log(error);
  }
};

module.exports = { addCategories, getCategories };
