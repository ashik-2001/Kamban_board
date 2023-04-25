require('dotenv').config({path: __dirname + '/../.env'})
require("./config/database").connect();

const express = require('express');
const app = express();
const port = process.env['PORT'];
const userAuth = require('./routes/user_auth')
const User = require('./model/user')

app.use(express.json())

app.use('/',userAuth)

app.listen(port, () => {
    console.log('its running on '+port)
})