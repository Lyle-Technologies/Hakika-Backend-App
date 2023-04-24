const Product = require("../models/productModel");

const getProducts = async (req, res) => {
  try {
    res.send("Products");
  } catch (error) {
    console.log(error);
  }
};

const addProducts = async (req, res) => {
  try {
    const { name, imageLink, price, description } = req.body;
    res.send(description);
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getProducts, addProducts };
