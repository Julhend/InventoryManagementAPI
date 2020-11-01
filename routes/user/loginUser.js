const express = require('express')
const app = express.Router()
const db = require('../../controller/dbController')
const jwt = require('jsonwebtoken')
const secret = 'kata rahasia saya'

app.post('/login', (req, res) => {

    const result = db.get('users', req.body)

    if (result) {
        result.token = jwt.sign(result, secret, {
            expiresIn: '3h'
        })
        res.send(result)
    } else {
        res.status(401).send('unauthorized')
    }
})

module.exports = app