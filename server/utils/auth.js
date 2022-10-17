const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('../schema/user.js')
const bcrypt = require('bcryptjs');

passport.use(new LocalStrategy(
    {
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true
    },
    async (req, username, password, done) => {
        User.findOne({ username: username }, function (err, user) {
            if (err) {
                return done(err)
            }
            if (!user) {
                return done(null, false)
            }
            if (!bcrypt.compareSync(password, user.password)) {
                return done(null, false)
            }
            return done(null, user)
        })
    }
))

passport.serializeUser((user, done) => {
    done(null, user.username);
});

passport.deserializeUser(async (username, done) => {
    const user = User.findOne({ username: username })
    return done(null, user);
});

module.exports = passport;
