const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/test', function (req, res) {
    const dict = {
        success: {
            hello: 'hello world'
        },
        faild: {
            hello: 'OAO'
        }
    };

    if (req.query.test === 'hello')
        res.send(dict.success);
    else
        res.send(dict.faild);
});

module.exports = app;
