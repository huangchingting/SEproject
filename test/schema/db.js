const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const host = process.env.TEST_HOST;
const port = process.env.TEST_PORT;
const dbname = process.env.TEST_DATABASE;

const close = async () => {
    await mongoose.connection.close();
};

const connect = async () => {
    await close();
    await mongoose.connect(`mongodb://${host}:${port}/${dbname}Test`);
};

const clear = async () => {
    await mongoose.connection.dropDatabase();
};

module.exports = {
    close,
    connect,
    clear,
};
