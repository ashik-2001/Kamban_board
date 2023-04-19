const express = require('express');
const app = express();
require('dotenv').config({path: __dirname + '/../.env'})

const port = process.env['PORT'];
const userAuth = require('./routes/user_auth')

app.use(express.json())

app.use('/',userAuth)

app.listen(port, () => {
    console.log('its running on '+port)
})