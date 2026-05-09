/* eslint-disable no-unused-vars */
'use strict';

const WishlistModel = require('./wishlistModel');
const catchAsync = require('../../../utils/catchAsync');
const AppError = require('../../../errors/appError');

// Add to wishlist
const addToWishlist = catchAsync(async (req, res, next) => {
  const { courseId } = req.body;
  const userId = req.user.id;

  if (!courseId) {
    return next(new AppError('Course ID is required', 400));
  }

  let wishlist = await WishlistModel.findOne({ user: userId });

  if (!wishlist) {
    // Create new wishlist if it doesn't exist
    wishlist = await WishlistModel.create({
      user: userId,
      list: [courseId],
    });
  } else {
    // Check if course already in wishlist
    if (wishlist.list.includes(courseId)) {
      return next(new AppError('Course is already in your wishlist', 400));
    }
    wishlist.list.push(courseId);
    await wishlist.save();
  }

  res.status(200).json({
    success: true,
    message: 'Course added to wishlist',
    data: wishlist,
  });
});

// Remove from wishlist
const removeFromWishlist = catchAsync(async (req, res, next) => {
  const { courseId } = req.params;
  const userId = req.user.id;

  const wishlist = await WishlistModel.findOne({ user: userId });

  if (!wishlist) {
    return next(new AppError('Wishlist not found', 404));
  }

  wishlist.list = wishlist.list.filter(id => id.toString() !== courseId);
  await wishlist.save();

  res.status(200).json({
    success: true,
    message: 'Course removed from wishlist',
    data: wishlist,
  });
});

// Get my wishlist
const getMyWishlist = catchAsync(async (req, res, next) => {
  const userId = req.user.id;

  let wishlist = await WishlistModel.findOne({ user: userId }).populate({
    path: 'list',
    select: 'name description category price thumbnailUrl rating author',
    populate: {
      path: 'author',
      select: 'name profilePic',
    },
  });

  if (!wishlist) {
    // Create new wishlist if it doesn't exist
    wishlist = await WishlistModel.create({
      user: userId,
      list: [],
    });
  }

  res.status(200).json({
    success: true,
    data: wishlist.list,
  });
});

module.exports = {
  addToWishlist,
  removeFromWishlist,
  getMyWishlist,
};
