const express = require('express')
const app = express.Router()
const db = require('../../controller/dbController')
const mysqlErrorHandler = require('../../controller/midleware/errorMiddleware')
const { salt } = require('../../helper/bcryptHelper')
// const uid = require('uid')

app.post('/register', (req, res) => {
    const username = req.body.username
    const password = req.body.password
    salt(password)
        .then(hashedPassword => {
            const user = {
                username,
                password: hashedPassword
            }
            db.add('users', user)

        })
        .then(addUserResult => {
            if (addUserResult) {
                res.send(addUserResult)

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