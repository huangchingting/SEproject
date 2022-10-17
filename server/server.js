const product = require('./api/product.js');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const transaction = require('./api/transaction.js');
const user = require('./api/user.js');
const Database = require("./utils/database.js");
const passport = require("./utils/auth.js")

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

dotenv.config();
const port = process.env.SERVER_PORT;
const db = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    name: process.env.DB_DATABASE
}

Database.connect(db.host, db.port, db.name);

const app = express();
app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json({limit: '5mb'}));
app.use(bodyParser.urlencoded({ extended: false }));

app.use(session({
    secret: 'nksnfoiehhrekwqnrlkje',
    resave: 'false',
    saveUninitialized: 'false'
}))
app.use(passport.initialize());
app.use(passport.session())

app.listen(port, () => {
    console.log(`Listening on port ${port}...`)
});

app.use('/api/product', product);
app.use('/api/transaction', transaction);
app.use('/api/user', user);
