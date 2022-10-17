const express = require('express');
const bcrypt = require('bcryptjs');
const user = express.Router();
const User = require('../schema/user.js');
const passport = require('../utils/auth.js');

const {error, warn, info} = require('../utils/log.js');

user.post('/login', passport.authenticate('local'),async (req, res, next) => {
    try {
        info("post /api/user/login");
        res.sendStatus(200);
    }
    catch (err) {
        next(err)
    }
})

user.post('/signup', async (req, res, next) => {
    const hash = bcrypt.hashSync(req.body.password, 0);
    info("post /api/user/signup");

    const newUser = await User.create({
        username: req.body.username,
        password: hash
    })
    await newUser.save();

    res.sendStatus(200);
})

user.get('/authentication', async (req, res, next) => {
    if (req.isAuthenticated()) {
        res.json({
            "isLogin": true
        });
    }
    else {
        res.json({
            "isLogin": false
        });
    }
})

module.exports = user