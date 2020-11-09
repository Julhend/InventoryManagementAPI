const express = require('express')
const app = express.Router()
const db = require('../../controller/dbController')
const passport = require('../../controller/midleware/authenticationMiddleware')
const mysqlErrorHandler = require('../../controller/midleware/errorMiddleware')

//app.use(passport.authenticate('bearer', { session: false }))

app.get('/stores', passport.authenticate('bearer', { session: false }), (req, res, next) => {
    const query = req.query
    const id = req.user.id
    query.userId = id
    db.get('stores', query)
        .then(result => {
            res.send(result)
        })
        .catch(err => {
            next(err)
        })
})

app.use(mysqlErrorHandler)

module.exports = app