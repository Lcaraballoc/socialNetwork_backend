const express = require('express');
const bodyParser = require('body-parser');
const user = require('./components/user/network');
const auth = require('./components/auth/network');
const post = require('./components/post/network');
const errors = require('../network/error');

const config = require('../config.js')
const app = express();

//middlewares
app.use(bodyParser.json())

//swagger documentation missing

//routes
app.use('/api/user', user);
app.use('/api/auth', auth);
app.use('/api/post', post);

//middlewares that works after the routes
app.use(errors);

app.listen(config.api.port, () => {
    console.log(`Listening http://localhost:${config.api.port}`)
})