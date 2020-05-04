const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
const mongoose = require('mongoose');

const UserLib = require('./library/user-lib.js');

// TODO: Use config file or env vars for database name and port
const MONGODB_URI = 'mongodb://localhost:27017/basicgram-database';
const port = 3002;

mongoose.connect(MONGODB_URI, { useNewUrlParser: true });
mongoose.connection.on('connected', () => {
    console.log("Connected to MongoDB");
});
mongoose.connection.on('error', (error) => {
    console.log("ERROR: " + error);
});

const app = express();
app.use(cookieParser());
app.use(bodyParser());
// TODO: Validate requests either here using express-validator or with custom validator library


app.post('/auth/verify', (req, res) => {
    const token = req.body.token;
    const userId = req.body.userId;

    UserLib.verifyUserToken(userId, token, res);
});

app.post('/auth/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    UserLib.loginUser(username, password, res);
});

app.post('/auth/create-user', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const name = req.body.name;
    const email = req.body.email;

    try {
        UserLib.createUser(username, password, name, email, res);
    } catch (err) {
        res.send({
            err,
        })
    }
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));