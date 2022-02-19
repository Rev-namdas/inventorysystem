const express = require("express");
const {
    fetchCustomers,
    createCustomers,
    deleteCustomer,
    updateStock,
    updateDeliveryStatus,
    productWiseCustomer,
} = require("../controllers/customerControllers");

const router = express.Router();

router.get("/all", fetchCustomers);
router.post("/create", createCustomers);
router.delete("/delete/:id", deleteCustomer);
router.post("/updatestock", updateStock);
router.patch("/updatedeliverystatus", updateDeliveryStatus);
router.post("/productwise", productWiseCustomer);

module.exports = router;
