const express = require('express')
const app = express.Router()
const db = require('../../controller/dbController')
const passport = require('../../controller/midleware/authenticationMiddleware')
const mysqlErrorHandler = require('../../controller/midleware/errorMiddleware')

//app.use(passport.authenticate('bearer', { session: false }))

app.post('/stores', passport.authenticate('bearer', { session: false }), (req, res) => {
    const body = req.body
    body.userId = req.user.id
    db.add('stores', body)
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