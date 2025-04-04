const express = require('express')
const router = require ("./router")
const dbConnect = require('./confiq/dbConnect')
require('dotenv').config()
const app = express()
app.use(express.json())
app.use(router)
dbConnect()

router.get('/', function (req, res) {
  res.send('Hello World')
})

app.listen(8000, () => {
     console.log("server is running")
})