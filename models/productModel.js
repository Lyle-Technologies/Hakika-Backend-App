const mongoose = require("mongoose");

// Define the product schema model

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    imageLink: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
