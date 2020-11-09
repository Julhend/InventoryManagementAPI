const jwt = require('jsonwebtoken')
const secret = 'kata rahasia saya'
const passport = require('passport')
const BearerStrategy = require('passport-http-bearer').Strategy

passport.use(new BearerStrategy(
    function (token, done) {
        jwt.verify(token, secret, (err, decoded) => {
            if (err) {
                if (err.name === 'TokenExpiredError')
                    done(null, false);
                done(err)
            }
            return done(null, decoded);
        })
    }
))
module.exports = passport
