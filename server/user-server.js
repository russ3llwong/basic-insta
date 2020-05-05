const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
const mongoose = require('mongoose');

const UserLib = require('./library/user-lib.js');

// TODO: Use config file or env vars for database name and port
const {MONGODB_URI} = require('./library/consts.js');

const port = 3003;

// const MONGODB_URI = 'mongodb://mongodb:27017/basicgram-database';

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


/**
 * GET user information based on userId
 *
 * @param userId of the user to get
 */
app.get('/user/:userId', (req, res) => {
    let userId = req.params.userId;
    UserLib.getUserInfo(userId, res);
});

app.put('/user/changePassword/:userId', (req, res) => {
    let userId = req.params.userId;
    let oldPassword = req.body.oldPassword;
    let newPassword = req.body.newPassword;

    UserLib.editPassword(userId, oldPassword, newPassword, res);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));