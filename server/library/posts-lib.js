const mongoose = require('mongoose');
const Basicgram = require('../models/basicgramModel.js');
const ObjectId = mongoose.Types.ObjectId;

// const CONSTANTS = require('./consts.js');


class BasicgramsLibrary {
    // returns {caption, image, imageThumbnail, createdAt, author, comments, _id}
    static createBasicgram(author, caption, image, imageThumbnail, kafkaProducerLib, res) {
        const newBasicgram = new Basicgram({
            caption,
            image,
            imageThumbnail,
            author: new ObjectId(author),
            createdAt: new Date(),
            comments: []
        });

        console.log(author);

        return newBasicgram.save((err) => {
            if (err) {
                console.log(err.name);
                res.send({
                    err
                });

                return;
            }
        
            res.send({
                newBasicgram
            });

            kafkaProducerLib.produceMessage('feed', "post");
        });
    };
    // returns { basicgrams: [array of posts]}
    static getAllBasicgrams(res) {
        // TODO: Cache redis?
        Basicgram
            .find({})
            .populate('author', ['username', 'name', 'email', 'created_at', '_id' ])
            .populate('comments')
            .exec((err, basicgrams) => {
                if ( err ) {
                    console.log('Could not get all basicgrams', err.name);

                    res.send({
                        err
                    });

                    return
                }

                res.send({
                    basicgrams
                });
            });
    }

    static _updateBasicgramComments(postId, comment, cb) {
        Basicgram
            .findByIdAndUpdate(postId, { '$push': { 'comments': comment }}, {'new': true, 'upsert': true}, cb);
    }

    static updateBasicgramComments(postId, comment, res) {
        this._updateBasicgramComments(postId, comment, (err, basicgram) => {
            if ( err ) {
                console.log(err);
                res.send({
                    err
                });
                return ;
            }
            res.send({
                basicgram
            });
        });
    }
    
    // returns {basicgram: basicgram}
    static getBasicgramById(postId, res) {
        Basicgram
            .findById(postId)
            .populate('author', ['username', 'name', 'email', 'created_at', '_id' ])
            .exec((err, basicgram) => {
                if ( err ) {
                    console.log(err);
                    res.send({
                        err
                    });
                    return ;
                }
                res.send({
                    basicgram
                });
            });
    }
    // returns {basicgrams: [user's basicgrams]}
    static getBasicgramsByUser(author, res) {
        Basicgram
            .find({author})
            .populate('author', ['username', 'name', 'email', 'created_at', '_id' ])
            .populate('comments')
            .exec((err, basicgrams) => {
                if ( err ) {
                    console.log(`Could not get ${author}'s basicgrams`, err.name);

                    res.send({
                        err
                    });

                    return
                }

                res.send({
                    basicgrams
                });
            });
    }
}

module.exports = BasicgramsLibrary;
