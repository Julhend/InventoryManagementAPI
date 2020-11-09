const express = require('express')
const app = express.Router()
const db = require('../../controller/dbController')
const mysqlErrorHandler = require('../../controller/midleware/errorMiddleware')
// const uid = require('uid')

app.post('/register', (req, res) => {
    const body = req.body
    db.add('users', body)
        .then(result => {
            if (result) {
                res.send('ok')

            } else {
                res.status(400).send('wrong body')
            }
        })
        .catch(err => {
            res.status(500).send(err)
        })

})
app.use(mysqlErrorHandler)

module.exports = app