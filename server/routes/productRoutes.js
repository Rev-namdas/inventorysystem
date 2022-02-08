const express = require("express");
const {
    fetchProducts,
    createProducts,
    deleteProduct,
    addProductQty,
    createManyProducts,
} = require("../controllers/productControllers");

const router = express.Router();

router.get("/all", fetchProducts);
router.post("/create", createProducts);
router.post("/create/many", createManyProducts);
router.delete("/delete/:id", deleteProduct);
router.patch("/update", addProductQty);

module.exports = router;
