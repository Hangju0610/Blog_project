const mongoose = require('mongoose');
const post_id = mongoose.Schema.Types.ObjectId;
// 게시판 Schema 작성하기
// 고유 ID의 이름을 변경해야함.
// why? Comment와 겹칠 수 있기 때문이죠.
const postSchema = new mongoose.Schema({
    post_id: post_id,
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

//저장될 장소,
module.exports = mongoose.model('posts', postSchema);
