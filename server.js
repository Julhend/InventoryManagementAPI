const express = require('express')
const bodyParser = require('body-parser')
const rootRoute = require('./routes/rootRoute')

const addInventory = require('./routes/inventory/addInventory')
const getInventory = require('./routes/inventory/getInventory')
const addStores = require('./routes/stores/addStores')
const getStores = require('./routes/stores/getStores')
const addGoods = require('./routes/goods/addGoods')
const getGoods = require('./routes/goods/getGoods')
const addUser = require('./routes/user/addUser')
const loginUser = require('./routes/user/loginUser')



const app = express()
app.use(rootRoute)
app.use(bodyParser.json())

app.use(getInventory)
app.use(addInventory)
app.use(getStores)
app.use(addStores)
app.use(getGoods)
app.use(addGoods)

app.use(addUser)
app.use(loginUser)

const port = 3000
app.listen(port, () => {
  console.log(`Backend app is running in http://localhost:${port}`);
})
