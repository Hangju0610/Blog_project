const mongoose = require('mongoose');

// 게시글 Schema 작성
const postSchema = new mongoose.Schema({
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
