const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const postSchema = new mongoose.Schema({
    postid: ObjectId,
    user_id: {
        type: String,
        required: true,
    },
    user_password: {
        type: String,
        required: true,
    },
    post_title: {
        type: String,
        required: true,
    },
    post_content: {
        type: String,
        required: true,
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('posts', postSchema);
