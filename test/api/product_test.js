const transaction = require('../../server/api/product');

const request = require('supertest');
const expect = require('chai').expect;
const Product = require('../../server/schema/product');
const {
    connect,
    close,
    clear
} = require('../schema/db');

const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use('/api/product', transaction);

const createOneProduct = async (img = 'xxx') => {
    // Create a new product.
    const product = await Product.create({
        img: img,
        title: 'Pencil',
        price: 10,
        description: 'The good old pencil.',
        stock: 5,
    });
    await product.save();
    return product;
};

const productEqual = (jsonProduct, queryProduct) => {
    expect(jsonProduct.id).to.equal(queryProduct.id);
    expect(jsonProduct.title).to.equal(queryProduct.title);
    expect(jsonProduct.price).to.equal(queryProduct.price);
    expect(jsonProduct.description).to.equal(queryProduct.description);
    expect(jsonProduct.stock).to.equal(queryProduct.stock);
    expect(jsonProduct.img).to.equal(queryProduct.img.toString());
}

describe('Product API', () => {

    before(async () => await connect());
    afterEach(async () => await clear());
    after(async () => await close());

    describe('GET /api/product', () => {
        it('should get a list of products', async () => {
            const product1 = await createOneProduct();
            const product2 = await createOneProduct();

            const res = await request(app)
                .get('/api/product')
                .set('Accept', 'application/json');

            expect(res.status).to.equal(200);
            expect(res.text).to.not.be.null;

            const products = JSON.parse(res.text);
            expect(products).to.have.lengthOf(2);

            productEqual(products[0], product1);
            productEqual(products[1], product2);
        });
    });
});
