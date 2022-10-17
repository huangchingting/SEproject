const Product = require('../../server/schema/product');
const expect = require('chai').expect;
const { connect, clear, close } = require('./db.js');

describe('Product schema', () => {

    before(async () => await connect());
    afterEach(async () => await clear());
    after(async () => await close());

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
        return product.id;
    };

    it('should be able to store a new product and get the product by its id', async () => {
        const img = 'Image in binray';
        const productId = await createOneProduct(img);

        // Retrieve the product we just stored.
        const product2 = await Product.findById(productId);

        expect(product2.img.toString('utf8')).to.equal(img);
    });

    it('should be able to updata a product by its id', async () => {
        const newTitle = 'Book';
        const newDescription = 'A nice book.';

        const productId = await createOneProduct();
        const product = await Product.findById(productId);
        product.title = newTitle;
        product.description = newDescription;
        await product.save();

        const product2 = await Product.findById(productId);
        expect(product2.title).to.equal(newTitle);
        expect(product2.description).to.equal(newDescription);
    });

    it('should be able to delete a product by its id', async () => {
        const productId = await createOneProduct();
        await Product.findById(productId).deleteOne();
        const products = await Product.find();
        expect(products).to.be.empty;
    });
});
