const express = require('express')
const app = express.Router()
const db = require('../../controller/dbController')
const passport = require('../../controller/midleware/authenticationMiddleware')

//app.use(passport.authenticate('bearer', { session: false }))
app.get('/goods', passport.authenticate('bearer', { session: false }), (req, res) => {
    const result = db.get('goods', req.query)
    res.send(result)
})
module.exports = app