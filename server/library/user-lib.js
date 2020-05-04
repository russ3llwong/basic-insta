const mongoose = require('mongoose');

const User = require('../models/user-model.js');
const ObjectId = mongoose.Types.ObjectId;


class UserLibrary {
    static createUser(username, password, name, email, res) {
        // TODO: Validate input
        let token = new ObjectId();
        let current_date = new Date();

        const newUser = new User({
            username: username,
            password: password,
            name: name,
            email: email,
            created_at: current_date,
            edited_at: current_date,
            token: token
        });

        newUser.save((error) => {
            if (error) {
                console.log(error.name);
                res.send({
                    error: error
                });

                return;
            }

            res.send({
                token: newUser.token,
                userId: newUser._id
            });
        });
    };

    // TODO: Pass in res
    static editUsername(userId, username) {
        const updatedUser = {
            username: username
        };

        User.findByIdAndUpdate(userId, updatedUser, err => {
            if (err) throw err;
            else {
                return {success: 'success'}
            }
        })
    };

    // TODO: Pass in res
    static checkUser(username) {
        User.findOne(username, (err,item)=>{
            if (err) return false;
            else if (item) return true;
            else return false;
        })
    }

    static loginUser(username, password, res) {
        this._getUserByUsername(username).then((user, error) => {
            if (error) {
                console.log(error);
                res.send({error, });
                return;
            }

            if (user && user.password === password) {
                res.send({
                    userId: user._id,
                    token: user.token,
                    valid: true,
                });
            } else {
                res.send({
                    valid: false
                });
            }
        }).catch(() => res.send({valid:false}))
    }
    
    static editPassword(userId, oldPassword, newPassword, res) {
        this._getUserById(userId).then((user, error) => {
            if (error) {
                console.log(error);
                res.send({error, });
                return;
            }

            if (user.password === oldPassword) {
                const updatedUser = {
                    password: newPassword
                };

                User.findByIdAndUpdate(userId, updatedUser, err => {
                    if (err) throw err;
                    else {
                        res.send({success: 'success'});
                    }
                })
            } else {
                res.send({error: 'Password incorrect!'});
            }
        });
    };

    static _getUserByUsername(username) {
        return User.findOne({ username: username });
    }

    // Something to consider: Can use User.findById(userId).exec(callback), might be cleaner.
    static _getUserById(userId) {
        return User.findById(userId);
    }

    static getUserInfo(userId, res) {
        this._getUserById(userId).then((user, error) => {
            if (error) {
                console.log(error);
                res.send({
                    error,
                });
                return;
            }

            res.send({
                user,
            });
        });
    }

    static verifyUserToken(userId, token, res) {
        this._getUserById(userId).then((user, error) => {
            if (error) {
                console.log(error);
                res.send({
                    error,
                });
            }

            let valid = false;
            if (user && String(token) === String(user.token)) valid = true;

            if (res) {
                res.send({
                    valid,
                })
            } else {
                console.log('User verified: ' + valid);
            }
        });
    }

    // TODO: Further execute all user business logic
}

module.exports = UserLibrary;