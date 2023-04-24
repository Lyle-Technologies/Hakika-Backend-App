const express = require("express");
const colors = require("colors");
require("dotenv").config();
const cors = require("cors");
const { connectDB } = require("./config/db");
const app = express();
const port = 8000;

app.listen(port, () => console.log(`API running on port ${port}`));

connectDB();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use("/api/products", require("./routes/productsRoute"));
