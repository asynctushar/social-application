const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const ErrorHandler = require('../utils/errorHandler');
const User = require("../models/User.js");

exports.getUser = catchAsyncErrors(async (req, res, next) => {
    const userId = req.params.userId;

    const user = await User.findById(userId);

    if (!user) {
        return next(new ErrorHandler("User not found", 404));
    }

    res.status(200).json({
        success: true,
        user
    })
})

exports.updateUser = catchAsyncErrors(async (req, res, next) => {
    const { name, email, city, website, password } = req.body;

    const user = await User.findByIdAndUpdate(req.user.id, {
        $set: {
            name,
            email,
            city,
            website,
            password
        }
    }, { new: true, runValidators: true })

    res.status(200).json({
        success: true,
        user
    })
})
