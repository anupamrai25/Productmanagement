const express = require("express");
const productController = require("../controllers/product.controller");
const router = express.Router();
const {validateProduct} = require('../Validation')

router.post("/products", validateProduct,productController.createProduct);
router.get("/products", productController.getProducts);
router.put("/products/:id", productController.updateProduct);
router.put("/products/:id", productController.status_user);


router.delete("/products/:id", productController.deleteProduct);

module.exports = router;
