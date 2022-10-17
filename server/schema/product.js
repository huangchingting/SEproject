// Product schema.
// - id: uuid
// - img: blob
// - title: string
// - price: int
// - description: string
// - stock: num
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    img: {
        type: Buffer,
        required: false
    },
    title: {
        type: String,
        required: true
    },
    price: {
       type:  Number,
       required: true
    },
    description: {
        type: String,
        required: true
    },
    stock: {
        type: Number,
        required: true
    }
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
