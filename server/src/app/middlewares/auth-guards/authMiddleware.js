'use strict';

const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const catchAsync = require('../../../utils/catchAsync');
const AppError = require('../../../errors/appError');
const UserModel = require('../../modules/user/userModel');

const verifyToken = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies && req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) return next(new AppError('Please log in to get access.', 401));

  // Verify token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // Check if user still exists
  const user = await UserModel.findById(decoded.id).select('+password_changed_at');
  if (!user) {
    return next(
      new AppError('The user belonging to this token does no longer exist.', 401),
    );
  }

  // Check if user changed password after the token was issued
  if (user.changedPasswordAfter && user.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError('User recently changed password! Please log in again.', 401),
    );
  }

  // Grant access to protected route
  req.user = user.id;
  req.decodedToken = decoded;
  next();
});

const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError('You do not have permission to perform this action', 403),
      );
    }
    next();
  };
};

module.exports = { verifyToken, restrictTo };
