const express = require('express')
const app = express.Router()
const db = require('../../controller/dbController')
const passport = require('../../controller/midleware/authenticationMiddleware')

//app.use(passport.authenticate('bearer', { session: false }))

app.get('/stores', passport.authenticate('bearer', { session: false }), (req, res) => {
    const query = req.query
    const userId = req.user.id
    query.userId = userId
    const result = db.get('stores', query)
    res.send(result)
})
module.exports = app