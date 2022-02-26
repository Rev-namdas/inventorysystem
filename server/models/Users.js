const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    account_type: [{ type: String, required: true, default: "user" }]
});

module.exports = mongoose.model("users", userSchema);
