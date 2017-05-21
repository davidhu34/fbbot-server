const express = require('express')
const bodyParser = require('body-parser')
const fbbot = require('./fbbot')

const app = express()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


const bot = fbbot(app)

app.listen(process.env.PORT || 8080)
