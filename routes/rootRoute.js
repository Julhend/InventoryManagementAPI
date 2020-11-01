// ⚠️ Do not change this route ⚠️
// Structure your route relative to the route real path, like
// routes
//    ᴸ notes
//        ᴸ getNotes.js (handles GET request in '/notes')

const express = require('express')
const app = express.Router()
const db = require('../controller/dbController')

app.get('/', (req, res) => {
    res.send("Hello world!")
})

module.exports = app