/* eslint-disable no-unused-vars */
'use strict';

const AppError = require('../../../errors/appError');
const catchAsync = require('../../../utils/catchAsync');
const bcrypt = require('bcryptjs');
const { sendToken } = require('../../../utils/authUtil');
const validator = require('validator');
const UserModel = require('./userModel');

const getSingleUser = catchAsync(async (req, res, next) => {
  const user = await UserModel.findById(req.user.id);
  if (!user) {
    return next(new AppError('User not found', 404));
  }
  res.status(200).json({
    success: true,
    body: { user },
  });
});

const signUp = catchAsync(async (req, res, next) => {
  const { name, phone, password, email } = req.body;

  console.log(name, phone, password, email);

  if (!password || password.length < 6)
    return next(new AppError('Password must be at least 6 characters', 400));
  if (!phone || phone.length < 11)
    return next(new AppError('Phone number must be at least 11 digits', 400));
  if (email && validator.isEmail(email)) {
    const isExistEmail = await UserModel.findOne({ email });
    if (isExistEmail) {
      return next(new AppError('User with this email already exists', 400));
    }
  }

  const isExistPhone = await UserModel.findOne({ phone });
  if (isExistPhone) {
    return next(
      new AppError('User with this phone number already exists', 400),
    );
  }

  const user = await UserModel.create({
    phone,
    password,
    name,
    email,
  });

  sendToken(user.role, user, 201, res);
});

const login = catchAsync(async (req, res, next) => {
  const { phone, password } = req.body;

  if (!phone || !password) {
    return next(new AppError('Provide valid phone and password!', 400));
  }
  const user = await UserModel.findOne({ phone }).select('+password');

  if (!user) return next(new AppError('Invalid phone or password', 401));

  const correct = await bcrypt.compare(password, user.password);
  if (!correct) return next(new AppError('Invalid phone or password', 401));

  sendToken(user.role, user, 200, res);
});

const logout = catchAsync(async (req, res, next) => {
  res.clearCookie('jwt');
  res.status(200).json({
    success: true,
    message: 'Logged out successfully',
  });
});

const updateMe = catchAsync(async (req, res, next) => {
  // 1) Create error if user POSTs password data
  if (req.body.password) {
    return next(new AppError('This route is not for password updates.', 400));
  }

  // 2) Filtered out unwanted fields names that are not allowed to be updated
  const filteredBody = {};
  const allowedFields = ['name', 'email', 'phone', 'profilePic', 'bio'];
  Object.keys(req.body).forEach((el) => {
    if (allowedFields.includes(el)) filteredBody[el] = req.body[el];
  });

  // 3) Update user document
  const updatedUser = await UserModel.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    body: { user: updatedUser },
  });
});

const updatePassword = catchAsync(async (req, res, next) => {
  // 1) Get user from collection
  const user = await UserModel.findById(req.user.id).select('+password');

  // 2) Check if posted current password is correct
  const { currentPassword, newPassword } = req.body;
  if (!currentPassword || !newPassword) {
    return next(new AppError('Please provide current and new password', 400));
  }

  if (!(await bcrypt.compare(currentPassword, user.password))) {
    return next(new AppError('Your current password is wrong', 401));
  }

  // 3) If so, update password
  user.password = newPassword;
  await user.save();

  // 4) Log user in, send JWT
  sendToken(user.role, user, 200, res);
});

const getAllInstructors = catchAsync(async (req, res, next) => {
  const instructors = await UserModel.find({
    role: { $in: ['teacher', 'admin'] },
  }).select('name email profilePic bio role');

  res.status(200).json({
    success: true,
    count: instructors.length,
    body: { instructors },
  });
});

module.exports = {
  signUp,
  login,
  logout,
  getSingleUser,
  updateMe,
  updatePassword,
  getAllInstructors,
};
