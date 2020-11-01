const express = require('express')
const app = express.Router()
const db = require('../../controller/dbController')
const uid = require('uid')

app.post('/register', (req, res) => {
    const body = req.body
    body.id = uid()
    const result = db.add('users', body)
    if (!result) {
        res.status(400).send(result)
    } else {
        res.send('ok')
    }
    return
})

module.exports = app