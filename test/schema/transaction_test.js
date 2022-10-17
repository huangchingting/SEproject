const Transaction = require('../../server/schema/transaction');
const expect = require('chai').expect;
const { connect, clear, close } = require('./db.js');

describe('Transaction schema', () => {

    before(async () => await connect());
    afterEach(async () => await clear());
    after(async () => await close());

    const products = [
        {
            productId: "62395319ff23f55f7d6856cc",
            amount: 5,
        },
    ];

    const createOneTransaction = async () => {
        const transaction = await Transaction.create({
            status: 'created',
            products: products,
        });
        await transaction.save();
        return transaction.id;
    };

    it('should be able to store a new transaction and get the transaction by its id', async () => {
        const transactionId = await createOneTransaction();

        // Retrieve the Transaction we just stored.
        const transaction2 = await Transaction.findById(transactionId);

        expect(transaction2.status).to.equal('created');
        expect(transaction2.products).to.have.lengthOf(1);
        expect(transaction2.products[0].productId.toString())
            .to.equal(products[0].productId);
    });

    it('should be able to updata a transaction by its id', async () => {
        const transactionId = await createOneTransaction();
        const transaction = await Transaction.findById(transactionId);
        transaction.status = 'paid';
        await transaction.save();

        const transaction2 = await Transaction.findById(transactionId);
        expect(transaction2.status).to.equal('paid');
    });

    it('should be able to delete a Transaction by its id', async () => {
        const transactionId = await createOneTransaction();
        await Transaction.findById(transactionId).deleteOne();
        const transactions = await Transaction.find();
        expect(transactions).to.be.empty;
    });
});
