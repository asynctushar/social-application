const express = require("express");
const { getPosts, addPost, deletePost } = require("../controllers/post");
const { isAuthenticated } = require('../middlewares/authMiddleware');

const router = express.Router();

router.route("/posts").get(isAuthenticated, getPosts)
router.route("/post/new").post(isAuthenticated, addPost)
router.route("/post/:id").delete(isAuthenticated, deletePost);

module.exports = router;
