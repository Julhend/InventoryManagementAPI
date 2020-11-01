const express = require('express')
const app = express.Router()
const db = require('../../controller/dbController')
const uid = require('uid')
const passport = require('../../controller/midleware/authenticationMiddleware')

//app.use(passport.authenticate('bearer', { session: false }))

app.post('/stores', passport.authenticate('bearer', { session: false }), (req, res) => {
    const body = req.body
    body.userId = req.user.id
    body.id = uid()
    const result = db.add('stores', body)
    if (!result) {
        res.status(400).send('Wrong body')
    } else {
        res.send(result)
    }
    return
})

module.exports = app