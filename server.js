const express = require("express");
const colors = require("colors");
require("dotenv").config();
const cors = require("cors");
const { connectDB } = require("./config/db");
const app = express();
const port = 8000;



connectDB();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.use("/api", require("./routes/productsRoute"));
app.use("/api/categories", require("./routes/categoryRoute"));

app.listen(port, () => console.log(`API running on port ${port}`));