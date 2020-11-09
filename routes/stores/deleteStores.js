const express = require('express')
const app = express.Router()
const db = require('../../controller/dbController')
const passport = require('../../controller/midleware/authenticationMiddleware')
const mysqlErrorHandler = require('../../controller/midleware/errorMiddleware')

//app.use(passport.authenticate('bearer', { session: false }))

app.delete('/stores', passport.authenticate('bearer', { session: false }), (req, res, next) => {
    const body = req.body
    db.remove('stores', body)
        .then(result => {
            if (!result) {
                res.status(400).send('Wrong body')
            } else {
                res.send(result)
            }
        })
        .catch(err => {
            next(err)
        })
})

app.use(mysqlErrorHandler)
module.exports = app