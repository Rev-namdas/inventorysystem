const express = require("express");
const {
    fetchCustomers,
    createCustomers,
    deleteCustomer,
    updateStock,
    updateDeliveryStatus,
} = require("../controllers/customerControllers");

const router = express.Router();

router.get("/all", fetchCustomers);
router.post("/create", createCustomers);
router.delete("/delete/:id", deleteCustomer);
router.post("/updatestock", updateStock);
router.patch("/updatedeliverystatus", updateDeliveryStatus);

module.exports = router;
