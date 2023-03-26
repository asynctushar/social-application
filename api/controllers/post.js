const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const ErrorHandler = require('../utils/errorHandler');
const Post = require("../models/Post.js");
const Comment = require('../models/Comment');
const getDataUri = require('../utils/getDataUri');
const cloudinary = require("cloudinary").v2;

exports.getPosts = catchAsyncErrors(async (req, res) => {
    const posts = await Post.find().populate("userId");

    res.status(201).json({
        success: true,
        posts
    })
})

exports.addPost = catchAsyncErrors(async (req, res, next) => {
    const desc = req.body.desc;
    const image = req.file;

    const post = await Post.create({
        desc,
        userId: req.user.id
    })

    if (image) {
        const imageUri = getDataUri(image);

        const myCloud = await cloudinary.uploader.upload(imageUri.content, {
            folder: '/social/post',
            crop: "scale",
        })

        post.images = {
            public_id: myCloud.public_id,
            url: myCloud.secure_url
        }

        await post.save();
    }

    await post.populate("userId");

    res.status(201).json({
        success: true,
        post
    })
})

exports.deletePost = catchAsyncErrors(async (req, res, next) => {
    const post = await Post.findById(req.params.id);

    if (!post) return next(new ErrorHandler("Post not found", 404));
    if (post.userId.toString() !== req.user.id) return next(new ErrorHandler("Not authorized to delete the post", 403));

    const comments = await Comment.find({
        postId: post.id
    })

    if (post.images.public_id) {
        await cloudinary.uploader.destroy(post.images.public_id);
    }

    await Promise.all(comments.map(async (comment) => { await comment.deleteOne() }))
    await post.deleteOne()

    res.status(200).json({
        success: true,
        message: "Post deleted"
    })
})
