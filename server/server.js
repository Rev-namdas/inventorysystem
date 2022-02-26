require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose')
const cors = require('cors');
const productRoutes = require('./routes/productRoutes')
const customerRoutes = require('./routes/customerRoutes')
const userRoutes = require('./routes/userRoutes')

const app = express();

app.use(cors({
    origin: "*"
}))
app.use(express.json())
app.use('/product', productRoutes);
app.use('/customer', customerRoutes);
app.use('/user', userRoutes);

mongoose.connect(process.env.MONGODBURL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(
        app.listen(process.env.PORT, () => {
            console.log(`server is running on port http://localhost:${process.env.PORT}/`);
        })
    )
    .catch((error) => console.log(error.message))