const express = require("express");
const {
    fetchCustomers,
    createCustomers,
    deleteCustomer,
    updateStock,
    updateDeliveryStatus,
    productWiseCustomer,
    userWiseCustomer,
    fetchCustomerNames,
} = require("../controllers/customerControllers");

const router = express.Router();

router.get("/all", fetchCustomers);
router.get("/names", fetchCustomerNames);
router.post("/create", createCustomers);
router.delete("/delete/:id", deleteCustomer);
router.post("/updatestock", updateStock);
router.patch("/updatedeliverystatus", updateDeliveryStatus);
router.post("/productwise", productWiseCustomer);
router.post("/userwise", userWiseCustomer);

module.exports = router;
