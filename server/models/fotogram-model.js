const mongoose = require("mongoose");

const basicgramModel = new mongoose.Schema({
  caption: {
    type: String,
    default: ''
  },
  image: {
    type: String,
    required: true
  },
  imageThumbnail: {
    type: String,
    required: true
  },
  createdAt: { type: Date, default: Date.now },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment"
    }
  ]
});

module.exports = mongoose.model("Basicgram", basicgramModel);
