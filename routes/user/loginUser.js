const express = require('express')
const app = express.Router()
const db = require('../../controller/dbController')
const jwt = require('jsonwebtoken')
const secret = 'kata rahasia saya'

app.post('/login', (req, res) => {
    db.get('users', req.body)
        .then(result => {
            const composedResult = result[0]
            if (composedResult) {
                const token = jwt.sign(composedResult, secret, {
                    expiresIn: '6h'
                })
                composedResult.token = token
                res.send(composedResult)
            } else {
                res.status(401).send('unauthorized')
            }
        })
        .catch(err => {
            res.status(500).send(err)
        })
})

module.exports = app