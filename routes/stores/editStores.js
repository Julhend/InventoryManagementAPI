const express = require('express')
const app = express.Router()
const db = require('../../controller/dbController')
const passport = require('../../controller/midleware/authenticationMiddleware')

//app.use(passport.authenticate('bearer', { session: false }))

app.patch('/stores', passport.authenticate('bearer', { session: false }), (req, res) => {
    const body = req.body
    const id = req.query.id
    db.edit('stores', id, body)
        .then(result => {
            if (!result) {
                res.status(400).send('Wrong body')
            } else {
                res.send(result)
            }
        })
        .catch(err => {
            res.status(500).send(err)
        })

})

module.exports = app