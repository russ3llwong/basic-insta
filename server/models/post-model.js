const mongoose = require('mongoose');

const PostModel = mongoose.Schema({
    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    caption: {
        type: String,
        required: false
    },
    // Relative path to image
    image: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        required: true,
        default: new Date()
    },
});

const Post = mongoose.model('Post', PostModel);

module.exports = Post;
