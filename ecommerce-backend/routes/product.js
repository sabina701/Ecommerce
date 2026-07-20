const express = require("express");
const router = express.Router();

const productController = require("../controllers/product");

router.get("/", productController.getAllProducts);

router.post("/", productController.createProduct);
router.get("/categories", productController.getCategories);
router.get("/category/:category", productController.getProductsByCategory);
router.get("/:id", productController.getSingleProduct);
router.put("/:id", productController.updateProduct);
router.delete("/:id", productController.deleteProduct);

module.exports = router;
