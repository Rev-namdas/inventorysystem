const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
    customer_name: String,
    customer_address: String,
    customer_number: String,
    products: [{
        product_name: String,
        product_price: Number,
        order_quantity: Number
    }],
    delivery_status: { type: Boolean, default: false },
    order_date: String,
    order_month: String,
},
{
    timestamps: true
});

module.exports = mongoose.model("customers", customerSchema);
