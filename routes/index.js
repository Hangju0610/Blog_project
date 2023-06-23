const express = require('express');
const postrouter = require('./post');
const commentrouter = require('./comments');

const router = express.Router();

router.get('/', (req, res) => {
    res.send("HJ's Blog!");
});

router.use('/posts', postrouter);
router.use('/posts/:postid/comments', commentrouter);

module.exports = router;
