'use strict';

const express = require('express');
const {
  addToWishlist,
  removeFromWishlist,
  getMyWishlist,
} = require('./wishlistController');
const { verifyToken } = require('../../middlewares/auth-guards/authMiddleware');

const wishlistRouter = express.Router();

// All routes are protected
wishlistRouter.use(verifyToken);

wishlistRouter.route('/')
  .get(getMyWishlist)
  .post(addToWishlist);

wishlistRouter.route('/:courseId')
  .delete(removeFromWishlist);

module.exports = wishlistRouter;
