const express = require('express')
const user = require('./components/user/network');
const bodyParser = require('body-parser')
const auth = require('./components/auth/network')

const config = require('../config.js')
const app = express();

//middlewares
app.use(bodyParser.json())

//FALTA INCLUIR DOCUMENTACION DE SWAGGER 

//routes
app.use('/api/user', user);
app.use('/api/auth', auth)

app.listen(config.api.port, () => {
    console.log(`Listening http://localhost:${config.api.port}`)
})