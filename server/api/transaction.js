const express = require('express');
const Transaction = require('../schema/transaction');
const Product = require('../schema/product');
const transaction = express.Router();

const {error, warn, info} = require('../utils/log.js');

transaction.get('/:transactionId', async (req, res, next) => {
    try {
        info('get /api/transaction');
        const transaction = await Transaction.findById(req.params.transactionId);
        res.json({
            id: transaction.id,
            status: transaction.status,
            products: transaction.products.map(product => {
                return {
                    productId: product.productId,
                    amount: product.amount,
                };
            })
        });
    }
    catch (err) {
        next(err)
    }
})

transaction.post('', async (req, res, next) => {
    try {
        info('post /api/transaction');

        // Check if we have the product and enough of stocks.
        const orders = req.body.products;
        let invalid_request = false;
        for (let order of orders) {
            const product = await Product.findById(order.productId);
            if (!product || product.stock < order.amount) {
                invalid_request = true;
                break;
            }
        }

        if (invalid_request) {
            res.status(500).send('Not enough stock or we do not have the product');
        } else {
            // Create the transaction.
            const transaction = await Transaction.create({
                status: req.body.status,
                products: req.body.products,
            });

            // Decrease the products.
            for (let order of orders) {
                const product = await Product.findById(order.productId);
                product.stock -= order.amount;
                await product.save();
            }

            // Return the transaction id.
            res.send(transaction.id);
        }
    }
    catch (err) {
        next(err)
    }
})

transaction.put('/:transactionId', async(req, res, next) => {
    try {
        info('put /api/transaction/:transactionId');
        const transaction = await Transaction.findById(req.params.transactionId);
        transaction.status = req.body.status;
        await transaction.save();
        res.sendStatus(200);
    }
    catch (err) {
        next(err)
    }
})

module.exports = transaction
