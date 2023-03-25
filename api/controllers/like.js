const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const ErrorHandler = require('../utils/errorHandler');
const Post = require('../models/Post');
const Like = require('../models/Like');

exports.getLikes = catchAsyncErrors(async (req, res, next) => {
    const post = await Post.findById(req.params.id);
    if (!post) return next(new ErrorHandler("Post not found", 404));

    const likes = await Like.find({
        postId: post.id
    });

    res.status(201).json({
        success: true,
        likes
    })
});

exports.addLike = catchAsyncErrors(async (req, res, next) => {
    const post = await Post.findById(req.params.id);
    if (!post) return next(new ErrorHandler("Post not found", 404));

    const isLiked = await Like.findOne({
        postId: post.id,
        userId: req.user.id
    });

    if (isLiked) return next(new ErrorHandler("Post already liked", 404));


    await Like.create({
        postId: post.id,
        userId: req.user.id
    })

    const likes = await Like.find({
        postId: post.id
    });

    res.status(201).json({
        success: true,
        likes
    })
})

exports.deleteLike = catchAsyncErrors(async (req, res, next) => {
    const post = await Post.findById(req.params.id);
    if (!post) return next(new ErrorHandler("Post not found", 404));

    const like = await Like.findOne({
        postId: post.id,
        userId: req.user.id
    });

    if (!like) return next(new ErrorHandler("Post wasn't liked", 404));

    await like.deleteOne();

    const likes = await Like.find({
        postId: post.id
    });

    res.status(201).json({
        success: true,
        message: "Unliked post",
        likes
    })
})