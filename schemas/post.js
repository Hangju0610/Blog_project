const mongoose = require('mongoose');

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

// const posts = [
//     {
//         post_id: 0,
//         user_id: 'user',
//         user_password: '1234',
//         post_title: 'title',
//         post_content: 'content',
//         created_at: '2020-01-01 00:00:00',
//     },
//     {
//         post_id: 1,
//         user_id: 'user2',
//         user_password: '12345',
//         post_title: 'title2',
//         post_content: 'content2',
//         created_at: '2020-02-02 00:00:00',
//     },
// ];

// module.exports = posts;
