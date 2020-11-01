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

// function authentication(req, res, next) {

//     const authorization = req.headers.authorization
//     if (authorization) {
//         const token = authorization.split(' ')[1]
//         try {
//             const tokenPayload = jwt.verify(token, secret)
//             req.user = tokenPayload
//             next()
//         } catch (error) {
//             res.status(401).send('token expired, please login')
//         }
//     } else {
//         res.status(401).send('token nya gda')
//     }
// }
// module.exports = authentication