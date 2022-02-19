const mongoose = require("mongoose");
const Customers = require("../models/Customers");
const Products = require("../models/Products");

const fetchCustomers = async (req, res) => {
    try {
        const customers = await Customers.find();
        res.status(201).json(customers);
    } catch (err) {
        console.log(err);
    }
};

const createCustomers = async (req, res) => {
    const details = req.body;
    // {
    //     "name": "Sadman",
    //     "address": "Kafrul, Dhaka",
    //     "contact": "01521497760",
    //     "products": [
    //         {
    //             "product_name": "Sandle",
    //             "product_price": 210,
    //             "order_quantity": 1
    //         },
    //         {
    //             "product_name": "Pen",
    //             "product_price": 10,
    //             "order_quantity": 1
    //         }
    //     ]
    // }

    details.products.forEach(async (each) => {
        await Products.findByIdAndUpdate({ _id: each._id }, { $inc: { order_quantity: each.order_quantity } })
    })
    
    const newCustomer = new Customers({
        customer_name: details.name,
        customer_address: details.address,
        customer_number: details.contact,
        products: details.products,
        order_date: details.orderdate
    });

    try {
        await newCustomer.save();
        res.status(201).json({ message: "Customer Info Created Successfully" });
    } catch (err) {
        res.json({ message: "Server Error" });
        console.log(err);
    }
};

const updateStock = async (req, res) => {
    const products = req.body;

    try {
        products.forEach(async (each) => {
            await Products.findByIdAndUpdate({ _id: each._id }, { $inc: { order_quantity: - each.order_quantity } })
        })
        res.status(201).json({ message: "Product Info Updated Successfully" });
    } catch (err) {
        res.json({ message: "Server Error" });
        console.log(err);
    }
};

const updateDeliveryStatus = async (req, res) => {
    const details = req.body;

    if (!mongoose.Types.ObjectId.isValid(details.id)) {
        return res.status(404).send("Invalid ID !");
    }

    try {
        await Customers.findByIdAndUpdate({ _id: details.id }, { delivery_status: details.delivery_status });
        return res
            .status(201)
            .json({ message: "Delivery Status Changed Successfully" });
    } catch (error) {
        console.log(error);
        return res.json({ message: "Server Error" });
    }
};

const deleteCustomer = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send("Invalid ID !");
    }

    try {
        await Customers.findByIdAndRemove(id);
        return res
            .status(201)
            .json({ message: "Customer Info Removed Successfully" });
    } catch (error) {
        console.log(error);
        return res.json({ message: "Server Error" });
    }
};

const productWiseCustomer = async (req, res) => {
    const details = req.body

    await Customers.aggregate([
        {
            $unwind: "$products"
        },
        {
            $match: { "products.product_name": details.product }
        }
    ], (err, data) => {
        if(err) return res.json({ message: 'err' })

        return res.json(data)
    })

}

module.exports = {
    fetchCustomers,
    createCustomers,
    deleteCustomer,
    updateStock,
    updateDeliveryStatus,
    productWiseCustomer
};
