const Product = require("../model/product.model");

// Create a product
exports.createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).send(product);
  } catch (err) {
    res.status(500).send({ message: "Error creating product" });
  }
};

// Get all products
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.status(200).send(products);
  } catch (err) {
    res.status(500).send({ message: "Error fetching products" });
  }
};

// Update product by ID
exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.update(req.body, {
      where: { id: req.params.id },
    });
    res.status(200).send(product);
  } catch (err) {
    res.status(500).send({ message: "Error updating product" });
  }
};

// Delete product by ID
exports.deleteProduct = async (req, res) => {
  try {
    await Product.destroy({
      where: { id: req.params.id },
    });
    res.status(200).send({ message: "Product deleted" });
  } catch (err) {
    res.status(500).send({ message: "Error deleting product" });
  }
};

exports.status_user = async (req, res) => {
    try {
        let status = req.body.status;  // It's better to send data in the request body for PUT requests
        let id = req.params.id;        // Use req.params to get the id from the URL
        let SqlQuery = 'UPDATE products SET status = ? WHERE id = ?';
        
        // Using Promises instead of callback-based `connectDb.query()`
        const result = await connectDb.query(SqlQuery, [status, id]);

        // Respond with the result
        res.json(result);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error", error });
    }
};
