const mongoose = require("mongoose");
const Products = require("../models/Products");

const fetchProducts = async (req, res) => {
    try {
        const products = await Products.find();
        res.status(201).json(products);
    } catch (err) {
        console.log(err);
    }
};

const createProducts = async (req, res) => {
    const details = req.body;
    // {
    //     "name": "Card Reader",
    //     "price": 100,
    //     "qty": 5
    // }
    // or
    // {
    //     "name": "Card Reader",
    //     "price": 100
    // }

    const newProduct = new Products({
        product_name: details.name,
        product_price: details.price,
        product_quantity: details.qty || 1,
    });
    try {
        await newProduct.save();
        res.status(201).json({ message: "Product Created Successfully" });
    } catch (err) {
        if(err.code === 11000) {
            res.json({ message: "Product Already Exist! Try Another." });
        }
        console.log(err);
    }
};

const createManyProducts = async (req, res) => {
    const details = req.body;

    try {
        await Products.insertMany(details.products)
        res.status(201).json({ message: "Products Created Successfully" });
    } catch (err) {
        if(err.code === 11000) {
            res.json({ message: "Product Already Exist! Try Another." });
        }
        console.log(err.message);
    }
};

const deleteProduct = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send("Invalid ID !");
    }

    try {
        await Products.findByIdAndRemove(id);
        return res
            .status(201)
            .json({ message: "Product Removed Successfully" });
    } catch (error) {
        console.log(error);
        return res.json({ message: "Server Error" });
    }
};

const addProductQty = async (req, res) => {
    const details = req.body;
    // {
    //     "id": "619fba3464dc5e481d98a000",
    //     "qty": 2
    // }

    if (!mongoose.Types.ObjectId.isValid(details.id)) {
        return res.status(404).send("Invalid ID !");
    }

    try {
        await Products.findByIdAndUpdate(details.id, {
            product_quantity: details.qty,
        });
        return res
            .status(201)
            .json({ message: "Product Qty Updated Successfully" });
    } catch (error) {
        console.log(error);
        return res.json({ message: "Server Error" });
    }
};

module.exports = {
    fetchProducts,
    createProducts,
    createManyProducts,
    deleteProduct,
    addProductQty,
};
