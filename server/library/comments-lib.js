const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const BasicgramsLib = require('./posts-lib.js');
const Comment = require('../models/commentModel.js');
// const CONSTANTS = require('./consts.js');
require('../models/basicgramModel.js');
require('../models/commentModel.js');
require('../models/user-model.js');

class CommentsLibrary {
    static createComment(author, post, text, kafkaProducerLib, res) {

        const newComment = new Comment({
            author: new ObjectId(author),
            text,
            post: new ObjectId(post),
            createdAt: new Date(),
        });

        newComment.save((err, comment) => {
            if (err) {
                console.log(err.name);
                res.send({
                    err
                });
                return false;
            }

            BasicgramsLib._updateBasicgramComments(post, comment, (err, basicgram) => {
                if (err) {
                    console.log(err.name);
                    res.send({
                        err
                    });
                    return;
                }
                console.log(post);
                res.send({
                    comment,// return comment or basicgram here?
                    basicgram
                });

                kafkaProducerLib.produceMessage('comment', post);
            });
        });
    }

    static getCommentById(commentId, res) {
        Comment
            .findById(commentId)
            .populate('author', ['username', 'name', 'email', 'created_at', '_id' ])
            .populate('post')
            .exec((err, comment) => {
                if ( err ) {
                    console.log(err);
                    res.send({
                        err
                    });
                    return ;
                }
                console.log(comment);
                res.send({
                    comment
                });
            });
    }

    static getCommentsByPost(post, res) {
        Comment
            .find({post}) 
            .populate('author', ['username', 'name', 'email', 'created_at', '_id' ])
            .populate('post')
            .exec((err, comments) => {
            if ( err ) {
                console.log(`Could not get ${post}'s comments`, err.name);

                res.send({
                    err
                });

                return;
            }
            console.log(comments);
            res.send({
                comments
            });
        });
    };
}

module.exports = CommentsLibrary;
