const express = require('express')
const app = express.Router()
const db = require('../../controller/dbController')
const jwt = require('jsonwebtoken')
const { checkPassword } = require('../../helper/bcryptHelper')
const secret = 'kata rahasia saya'

app.post('/login', (req, res) => {
    const username = req.body.username
    const password = req.body.password
    let user;
    db.get('users', { username })
        .then(getUsersResult => {
            if (getUsersResult.length) {
                user = getUsersResult[0]
                return checkPassword(password, user.password)
            } else {
                res.status(401).send('unauthorized')
            }
        })

        .then(checkPasswordResult => {
            if (checkPasswordResult) {
                const token = jwt.sign(user, secret, {
                    expiresIn: '6h'
                })
                user.token = token
                res.send(user)
            } else {
                res.status(401).send('unauthorized')
            }
        })

        .catch(err => {
            res.status(500).send(err)
        })
})

module.exports = app