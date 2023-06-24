const mongoose = require('mongoose');

// comment Schema 작성
const commentSchema = new mongoose.Schema({
    post_id: {
        type: String,
        required: true,
    },
    user_id: {
        type: String,
        required: true,
    },
    user_password: {
        type: String,
        required: true,
    },
    comment_content: {
        type: String,
        required: true,
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('comments', commentSchema);
