const express = require('express');
const product = express.Router();
const {error, warn, info} = require('../utils/log.js');
const Product = require('../schema/product.js');

const authenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    error('Unauthenticated');
    return res.sendStatus(401);
};

product.get('', async (req, res, next) => {
    try {
        info('get /api/product');
        const items = await Product.find({}).exec();
        res.json( items.map( obj => {
            return {
                id: obj._id,
                img: obj.img.toString(),
                title: obj.title,
                price: obj.price,
                description: obj.description,
                stock: obj.stock
            }
        } ));
    }
    catch (err) {
        next(err)
    }
})

product.post('', authenticated, async (req, res, next) => {
    try {
        info('post /api/product');

        const item = await Product.create({
            title: req.body.title,
            price: req.body.price,
            img: req.body.img,
            description: req.body.description,
            stock: req.body.stock
        });
        await item.save();

        res.send(item._id);
    }
    catch (err) {
        next(err)
    }
})

product.put('/:productId', authenticated, async(req, res, next) => {
    try {
        info('put /api/product/:productId');

        const filter = {_id: req.params.productId};
        const update = {
            title: req.body.title,
            price: req.body.price,
            img: req.body.img,
            description: req.body.description,
            stock: req.body.stock
        };
        await Product.findByIdAndUpdate(filter, update, {
            new: true
        })

        res.sendStatus(200);
    }
    catch (err) {
        next(err)
    }
})

product.delete('/:productId', authenticated, async(req, res, next) => {
    try {
        info('del /api/product/:productId');
        const filter = {_id: req.params.productId};

        await Product.findOneAndDelete(filter);

        res.sendStatus(200);
    }
    catch (err) {
        next(err)
    }
})

module.exports = product
