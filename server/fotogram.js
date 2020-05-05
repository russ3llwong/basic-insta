const axios = require('axios');
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');

const {GATEWAY_HOST, MONGODB_URI, REDIS_HOST, REDIS_PORT, KAFKA_HOST} = require('./library/consts.js');
// const GATEWAY_HOST = 'http://gateway:4000';
// const MONGODB_URI = 'mongodb://mongodb:27017/basicgram-database';
// const REDIS_HOST = 'redis';
// redis stuff
const express = require("express");
const kafka = require('kafka-node');
const mongoose = require('mongoose');
const redis = require("redis");
const redisClient = redis.createClient({
  host:REDIS_HOST,
  port: REDIS_PORT
});

const BasicgramsLib = require('./library/posts-lib.js');
const CommentsLib = require('./library/comments-lib.js');
const KafkaProducerLib = require('./library/kafka-producer.js');

require('./models/user-model.js');
require('./models/basicgramModel.js');
require('./models/commentModel.js');

mongoose.connect(MONGODB_URI, { useNewUrlParser: true });
mongoose.connection.on('connected', () => {
    console.log("Connected to MongoDB");
});
mongoose.connection.on('error', (error) => {
    console.log("ERROR: " + error);
});

// *** image stuff ***
let multer = require("multer");
let storage = multer.diskStorage({
  filename: (req, file, callback) => {
    callback(null, Date.now() + file.originalname);
  }
});
let imageFilter = (req, file, cb) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
    return cb(new Error("jpg, jpeg, png, or gif format only"), false);
  }
  cb(null, true);
};
let upload = multer({ storage: storage, fileFilter: imageFilter });
let cloudinary = require("cloudinary");
cloudinary.config({
  cloud_name: "dzjtqbbua",
  api_key: "559561864892248",
  api_secret: "n1jUnMK_r3B3hGuVIHasS7kHj1Y"
});
// *** image stuff ***
const consts = require('./library/consts.js');
try {
  const KafkaClient = new kafka.KafkaClient({kafkaHost:KAFKA_HOST});
  const kafkaProducer = new kafka.Producer(KafkaClient);

  
  kafkaProducer.on('ready', () => {
    console.log('producer ready!');
    console.log(consts);
    const kafkaProducerLib = new KafkaProducerLib(kafkaProducer);
    const app = express();
    app.use(cookieParser());
    app.use(bodyParser());

    // Middleware caches token auth result
    app.use((req, res, next) => {
      const token = req.cookies.token;
      const userId = req.cookies.userId;
      const body = {
        token,
        userId
      };
      if ( !token || !userId ) {
        res.status(403);
        res.send({
          valid: false
        });
      }
      redisClient.get(token, (err, cachedValue) => {
        console.log(err);

        if ( cachedValue ) {
          console.log('Cache hit!', cachedValue);
          if ( cachedValue === 'true' ) {
            console.log(cachedValue);
            return next();
          } else {
            res.status(403);
            return res.send({
              valid: false
            });
          }
        } else {
          axios.post(`${GATEWAY_HOST}/auth/verify`, body).then(response => {
            console.log(response);
            if ( response.data && response.data.valid ) {
              console.log(response);
              redisClient.set(token, true);
              return next();
            } else {
              redisClient.set(token, false);
              res.status(403);
              return res.send({
                valid: false
              });
            }
          }).catch((e) => {
            console.log(e);
            res.status(404);
            return res.send({
              valid: false
            });
          });
        }
      });
    });

    // create new post
    app.post("/basicgrams/new", upload.single("image"), (req, res) => {
      cloudinary.uploader.upload(req.file.path, (result, err) => {
        if (err) {
          console.log("Image upload error...", err)
          return res.send({
            err
          });
        }

        const author = req.cookies.userId;
        const caption = req.body.caption || '';
        const image = result.secure_url;
        const imageThumbnail = "http://res.cloudinary.com/dzjtqbbua/image/upload/c_fit,h_400,w_400/" +
          result.public_id;

        // get author name and username
        let updateFeedPayload = [{
          topic: 'feed',
          message: 'comment'
        }];

        BasicgramsLib.createBasicgram(author, caption, image, imageThumbnail, kafkaProducerLib, res)
      });
    });

    // get all posts
    app.get("/basicgrams", (req, res) => {
      BasicgramsLib.getAllBasicgrams(res);
    });

    // get post by basicgram id
    app.get("/basicgrams/:id", (req, res) => {
      const basicgramId = req.params.id;

      BasicgramsLib.getBasicgramById(basicgramId, res);
    });

    // get post by user id
    app.get("/basicgrams/user/:id", (req, res) => {
      const userId = req.params.id;

      BasicgramsLib.getBasicgramsByUser(userId, res);
    });

    // Comment endpoints
    // create new comment
    app.post("/basicgrams/comment/new", (req, res) => {
      const author = req.cookies.userId;
      const post = req.body.postId;
      const text = req.body.text;

      CommentsLib.createComment(author, post, text, kafkaProducerLib, res);
    });

    // find comment by Id
    app.get("/basicgrams/comment/:id", (req, res) => {
      const commentId = req.params.id;

      CommentsLib.getCommentById(commentId, res);
    });

    // find comments by post
    app.get("/basicgrams/comment/post/:id", (req, res) => {
      const postId = req.params.id;

      CommentsLib.getCommentsByPost(postId, res);
    });

    const PORT = 5000;
    app.listen(PORT);
  });
} catch (e) {
  console.log(e);
}
