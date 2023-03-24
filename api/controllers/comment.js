const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const ErrorHandler = require('../utils/errorHandler');
const Post = require('../models/Post');
const Comment = require('../models/Comment');

exports.getComments = catchAsyncErrors(async (req, res, next) => {
    const post = await Post.findById(req.params.postId);

    if (!post) return next(new ErrorHandler("Post not found", 404));

    const comments = await Comment.find({
        postId: post.id
    });


    res.status(200).json({
        success: true,
        comments
    })

})

exports.addComment = catchAsyncErrors(async (req, res, next) => {
    const desc = req.body.desc;
    if (!desc) return next(new ErrorHandler("Pkease add description", 400));

    const post = await Post.findById(req.params.postId);
    if (!post) return next(new ErrorHandler("Post not found", 404));

    const comment = await Comment.create({
        postId: post.id,
        desc,
        userId: req.user.id
    });


    res.status(200).json({
        success: true,
        comment
    })
})

exports.deleteComment = catchAsyncErrors(async (req, res, next) => {
    const comment = await Comment.findById(req.params.id);
    if (!comment) return next(new ErrorHandler("Comment not found", 404));

    await comment.deleteOne();

    res.status(200).json({
        success: true,
        message: "Comment deleted"
    })
})
