// Load environment variables from .env file
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const productRoutes = require("./routes/product.routes");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Use product routes
app.use("/api", productRoutes);

// Use PORT from the .env file, default to 5000 if not set
const PORT = process.env.PORT ;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
