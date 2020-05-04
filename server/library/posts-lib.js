const mongoose = require('mongoose');
const Basicgram = require('../models/fotogram-model.js');
const ObjectId = mongoose.Types.ObjectId;


class BasicgramsLibrary {
    // returns {caption, image, imageThumbnail, createdAt, author, comments, _id}
    static createBasicgram(author, caption, image, imageThumbnail, res) {
        const newBasicgram = new Basicgram({
            caption,
            image,
            imageThumbnail,
            author: new ObjectId(author),
            createdAt: new Date(),
            comments: []
        });

        console.log(author);

        newBasicgram.save((err) => {
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
        });
    };

    // returns { basicgrams: [array of posts]}
    static getAllBasicgrams(res) {
        // TODO: Cache redis?
        Basicgram.find({}, (err, basicgrams) => {
            if (err) {
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
    };

    // returns {basicgram: basicgram}
    static getBasicgramById(postId, res) {
        Basicgram.findById(postId).then((err, basicgram) => {
            if (err) {
                console.log(err);
                res.send({
                    err
                });
                return;
            }
            res.send({
                basicgram
            });
        });
    }
    // returns {basicgrams: [user's basicgrams]}
    static getBasicgramsByUser(author, res) {
        Basicgram.find({ author }, (err, basicgrams) => {
            if (err) {
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