const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const ErrorHandler = require('../utils/errorHandler');
const Post = require("../models/Post.js");

exports.getPosts = catchAsyncErrors( async (req, res) => {
    const posts = await Post.find().populate("userId");

    res.status(201).json({
        success: true,
        posts
    })
})

exports.addPost = catchAsyncErrors(async (req, res, next) => {
    const desc = req.body.desc
    // add cloudinary later

    const post = await Post.create({
        desc,
        userId: req.user.id
    })

    await post.populate("userId");

    res.status(201).json({
        success: true,
        post
    })
})

exports.deletePost = catchAsyncErrors( async (req, res,next) => {
    const post = await Post.findById(req.params.id);

    if (!post) return next(new ErrorHandler("Post not found", 404));
    if (post.userId.toString() !== req.user.id) return next(new ErrorHandler("Not authorized to delete the post", 403));

    await post.deleteOne()

    res.status(200).json({
        success: true,
        message: "Post deleted"
    })
})
