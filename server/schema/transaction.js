// Transaction schema.
// - id: uuid
// - status: enum(created, paid, completed)
// - products: array
//     - productId: uuid
//     - amount: int
const mongoose = require('mongoose');

const productInfoSchema = new mongoose.Schema({
    productId: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true
    },
    amount: {
        type: Number,
        required: true
    }
},
{
    toJSON: {
        transform: (doc, ret) => {
            delete ret._id;
        }
    }
}
);

const transactionSchema = new mongoose.Schema(
{
    status: {
        type: String,
        enum: ['created', 'paid', 'completed'],
        required: true
    },
    products: {
        type: [productInfoSchema],
        required: true
    }
},
{
    toJSON: {
        transform: (doc, ret) => {
            delete ret._id;
            delete ret.__v;
        }
    }
}
);

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
