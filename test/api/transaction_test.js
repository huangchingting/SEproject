const transaction = require('../../server/api/transaction');

const request = require('supertest');
const expect = require('chai').expect;
const Transaction = require('../../server/schema/transaction');
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
app.use('/api/transaction', transaction);

const createOneTransaction = async () => {
    const products = [
        {
            productId: "62395319ff23f55f7d6856cc",
            amount: 5,
        },
    ];
    const transaction = await Transaction.create({
        status: 'created',
        products: products,
    });
    return transaction;
};

const createOnePencilOneScissors = async () => {
    await Product.create({
        title: 'pencil',
        price: 10,
        description: 'A pencil.',
        stock: 1,
    });
    await Product.create({
        title: 'scissors',
        price: 20,
        description: 'A scissors.',
        stock: 1,
    });
}

describe('Transaction API', () => {

    before(async () => await connect());
    afterEach(async () => await clear());
    after(async () => await close());

    describe('GET /api/transaction/{id}', () => {
        it('should get the desire transaction.', async () => {
            const transaction = await createOneTransaction();

            const res = await request(app)
                .get(`/api/transaction/${transaction.id}`)
                .set('Accept', 'application/json');

            expect(res.status).to.equal(200);
            expect(res.text).to.not.be.null;

            const transaction2 = JSON.parse(res.text);
            expect(transaction2.status).to.equal(transaction.status);
            expect(transaction2.products).to.have.lengthOf(1);
            expect(transaction2.products[0].productId)
                .to.equal(transaction.products[0].productId.toString());
        });
    });

    describe('POST /api/transaction', () => {
        describe('Create a new transaction', () => {
            it('should decrease the stock if we have enough products.', async () => {
                await createOnePencilOneScissors();
                let pencil = await Product.findOne({title: 'pencil'});
                let scissors = await Product.findOne({title: 'scissors'});

                const transaction = {
                    status: 'created',
                    products: [
                        {
                            productId: pencil.id,
                            amount: 1,
                        },
                        {
                            productId: scissors.id,
                            amount: 1,
                        },
                    ],
                };

                const res = await request(app)
                    .post('/api/transaction')
                    .set('Content-type', 'application/json')
                    .send(transaction);

                expect(res.status).to.equal(200);
                expect(res.text).to.not.be.null;

                // Check if transaction is stored in the database.
                const id = res.text;
                const transaction2 = await Transaction.findById(id);
                expect(transaction2.status).to.equal(transaction.status);
                expect(transaction2.products).to.have.lengthOf(2);
                expect(transaction2.products[0].productId.toString())
                    .to.equal(transaction.products[0].productId);

                // Check if the stock is decreased.
                pencil = await Product.findOne({title: 'pencil'});
                scissors = await Product.findOne({title: 'scissors'});
                expect(pencil.stock).to.equal(0);
                expect(scissors.stock).to.equal(0);
            });

            it('should return error if we do not have enough products.', async () => {
                await createOnePencilOneScissors();
                let pencil = await Product.findOne({title: 'pencil'});
                let scissors = await Product.findOne({title: 'scissors'});

                const transaction = {
                    status: 'created',
                    products: [
                        {
                            productId: pencil.id,
                            amount: 10,
                        },
                        {
                            productId: scissors.id,
                            amount: 1,
                        },
                    ],
                };

                const res = await request(app)
                    .post('/api/transaction')
                    .set('Content-type', 'application/json')
                    .send(transaction);

                expect(res.status).to.equal(500);
                expect(res.text).to.not.be.null;

                // Check if the transaction is empty.
                const transactions = await Transaction.find();
                expect(transactions).is.empty;

                // Check if the stock is not decreased.
                pencil = await Product.findOne({title: 'pencil'});
                scissors = await Product.findOne({title: 'scissors'});
                expect(pencil.stock).to.equal(1);
                expect(scissors.stock).to.equal(1);
            });

            it('should return error if we do not have the products.', async () => {
                await createOnePencilOneScissors();
                let pencil = await Product.findOne({title: 'pencil'});
                let scissors = await Product.findOne({title: 'scissors'});
                await Product.deleteOne({title: 'pencil'});

                const transaction = {
                    status: 'created',
                    products: [
                        {
                            productId: pencil.id,
                            amount: 1,
                        },
                    ],
                };

                const res = await request(app)
                    .post('/api/transaction')
                    .set('Content-type', 'application/json')
                    .send(transaction);

                expect(res.status).to.equal(500);
                expect(res.text).to.not.be.null;

                // Check if the transaction is empty.
                const transactions = await Transaction.find();
                expect(transactions).is.empty;

                // Check if the stock is not decreased.
                scissors = await Product.findOne({title: 'scissors'});
                expect(scissors.stock).to.equal(1);
            });
        });
    });

    describe('PUT /api/transaction/{id}', () => {
        it("should update the transaction's status.", async () => {
            const transaction = await createOneTransaction();

            const res = await request(app)
                .put(`/api/transaction/${transaction.id}`)
                .set('Content-type', 'application/json')
                .set('Accept', 'application/json')
                .send({status: 'paid'});

            expect(res.status).to.equal(200);

            const transaction2 = await Transaction.findById(transaction.id);
            expect(transaction2.status).to.equal('paid');
        });
    });

});
