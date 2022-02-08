const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    product_name: { type: String, required: true, unique: true },
    product_price: { type: Number, required: true },
    product_quantity: { type: Number, required: false, default: 1 },
    order_quantity: { type: Number, required: false, default: 0 }
});

module.exports = mongoose.model("products", productSchema);
