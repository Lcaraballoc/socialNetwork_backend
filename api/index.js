const express = require('express')
const user = require('./components/user/network');

const config = require('../config.js')
const app = express();

//routes
app.use('/api/user', user);

app.listen(config.api.port, () => {
    console.log(`Listening http://localhost:${config.api.port}`)
})