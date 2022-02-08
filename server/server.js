const express = require('express');
const mongoose = require('mongoose')
const cors = require('cors');
const productRoutes = require('./routes/productRoutes')
const customerRoutes = require('./routes/customerRoutes')

const app = express();
const MONGODBURL = 'mongodb+srv://sadman:sadman@cluster0.ujtxb.mongodb.net/inventorySystem?retryWrites=true&w=majority'
const PORT = 5000

app.use(cors({
    origin: "*"
}))
app.use(express.json())
app.use('/product', productRoutes);
app.use('/customer', customerRoutes);

mongoose.connect(MONGODBURL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(
        app.listen(PORT, () => {
            console.log(`server is running on port http://localhost:${PORT}/`);
        })
    )
    .catch((error) => console.log(error.message))