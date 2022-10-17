const Database = require('../database');
const dotenv = require('dotenv');
const Product = require('../../schema/product');
const fs = require('fs');
const path = require('path');

const main = async () => {
    dotenv.config();
    const db = {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        name: process.env.DB_DATABASE
    }
    await Database.connect(db.host, db.port, db.name);

    // Populate db with products.
    // NOTE: Assume that the image uploaded are base64 encoded.
    let product = await Product.create({
        img: fs.readFileSync(path.join(__dirname) + '/pencil.png', 'base64'),
        title: 'Pencil',
        price: 10,
        description: 'The good old pencil.',
        stock: 5,
    });
    await product.save();

    product = await Product.create({
        img: fs.readFileSync(path.join(__dirname) + '/scissors.jpg', 'base64'),
        title: 'Scissors',
        price: 15,
        description: 'They can cut.',
        stock: 20,
    });
    await product.save();

    await Database.close();
}

main().catch(err => console.log(err));
