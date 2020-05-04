const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const redis = require('redis');
const { MongoClient, ObjectID } = require("mongodb");
const mongoose = require('mongoose');
const BasicgramsLib = require('./library/posts-lib.js');

const MONGODB_URI = 'mongodb://localhost:27017/basicgram-database';
mongoose.connect(MONGODB_URI, { useNewUrlParser: true });
mongoose.connection.on('connected', () => {
    console.log("Connected to MongoDB");
});
mongoose.connection.on('error', (error) => {
  console.log("ERROR: " + error);
});
// mongoosey stuff

// *** image stuff ***
let multer = require("multer");
let storage = multer.diskStorage({
filename: (req, file, callback) => {
    callback(null, Date.now() + file.originalname);
  }
});

// monogo init
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

// express app stuff 
const app = express();
app.use(cookieParser());
app.use(bodyParser());


const PORT = 5000;
app.post("/basicgrams/new", upload.single("image"), (req, res) => {
  cloudinary.uploader.upload(req.file.path, (result, err) => {
    if (err) {
      console.log("Image upload error...", err)
      return res.send({
        err
      });
    }
    const author = req.cookies.userId;
    const caption = req.body.caption;
    const image = result.secure_url;
    const imageThumbnail = "http://res.cloudinary.com/dzjtqbbua/image/upload/c_fit,h_400,w_400/" +
    result.public_id;

    BasicgramsLib.createBasicgram(author, caption, image, imageThumbnail, res);
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
  const userId =  req.params.id;
  BasicgramsLib.getBasicgramsByUser(userId, res);
});

app.listen(PORT);

