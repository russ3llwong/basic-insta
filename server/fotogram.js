const express = require('express');
const bodyParser = require('body-parser');
//const { MongoClient } = require('mongodb');
const redis = require('redis');
const client = redis.createClient({
  host: process.env.REDIS_HOST || "localhost"
});
const app = express();
var router = express.Router();
// var middleware = require("../middleware");
var multer = require("multer");
var storage = multer.diskStorage({
  filename: function(req, file, callback) {
    callback(null, Date.now() + file.originalname);
  }
});

// monogo init
let imageFilter = function(req, file, cb) {
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

const { MongoClient, ObjectID } = require("mongodb");
const url = process.env.MONGO_HOST || "mongodb://localhost:27017";
const dbName = "basicgram";
const mongoClient = new MongoClient(url);

//INDEX - show all basicgrams or basicgrams of search result
mongoClient.connect(err => {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  console.log("Connected successfully to db");
  const db = mongoClient.db(dbName);

  // create collection. If already exists, ignores by default
  const collection = db.collection("basicgrams", function(err, collection) {});

  app.post("/basicgrams", upload.single("image"), function(
    //router.post("/", middleware.isLoggedIn, upload.single("image"), function(
    req,
    res
  ) {
    // get data from form and add to basicgrams array
    cloudinary.uploader.upload(req.file.path, function(result) {
      // add cloudinary url for the image to the basicgram object under image property
      req.body.basicgram.image = result.secure_url; // see cloudinary npm doc
      //generate a link to thumbnail version of the uploaded photo, crop type, height and width can be changed here
      req.body.basicgram.imageThumbnail =
        "http://res.cloudinary.com/dzjtqbbua/image/upload/c_fit,h_400,w_400/" +
        result.public_id;
      let body = req.body.basicgram;

      if (!body) {
        return res.send({
          status: false
        });
      }
      const document = { body };
      collection
        .insertOne(document)
        .then(response => {
          if (response) {
            console.log("New basicgram added");
            return res.redirect("/basicgrams");
          } else {
            return res.send({
              status: false
            });
          }
        })
        .catch(e => {
          console.log(e.message);
          return res.send({
            status: false
          });
        });
    });
  });

  app.get("/fotograms", function(req, res) {
    db.collection("basicgrams")
      .find({})
      .toArray()
      .then(allbasicgrams => {
        console.log(allbasicgrams);
        console.log("Succesfully got allbasicgrams");
        allbasicgrams = allbasicgrams || []; // some checking
        res.send({
          basicgrams: allbasicgrams
        });
  })
  .catch(e => {
    console.log(e.message);
    res.send({
      status: false
    });
  });
});

//TODO
  //NEW route "/basicgrams/new". GET method. Displays form to make a new basicgram.
  router.get("/new", function(req, res) {});

  //SHOW route "/basicgrams/:id". Shows details page about one basicgram with certain id
  router.get("/:id", function(req, res) {});

  //SHOW route "/basicgrams/:id/edit". Display the page to edit basicgram.
  router.get("/:id/edit", function(req, res) {});

  //UPDATE route "/basicgrams/:id". Update the basicgram identified by id.
  router.put("/:id", function(req, res) {});

  //DESTROY route "/basicgrams/:id". Delete the basicgram then redirect.
  router.delete("/:id", function(req, res) {});
  
  app.listen(5000);
});

