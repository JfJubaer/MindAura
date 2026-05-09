'use strict';

const CourseModel = require('./courseModel');
const catchAsync = require('../../../utils/catchAsync');
const AppError = require('../../../errors/appError');

const createCourse = catchAsync(async (req, res, next) => {
  // Add author from req.user
  req.body.author = req.user.id;
  const newCourse = await CourseModel.create(req.body);
  res.status(201).json({
    success: true,
    data: newCourse,
  });
});

const getAllCourses = catchAsync(async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const courses = await CourseModel.find({ isApproved: true })
    .populate('author', 'name profilePic')
    .skip(skip)
    .limit(limit);

  const total = await CourseModel.countDocuments({ isApproved: true });

  res.status(200).json({
    success: true,
    results: courses.length,
    total,
    page,
    totalPages: Math.ceil(total / limit),
    data: courses,
  });
});

const getUnapprovedCourses = catchAsync(async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const courses = await CourseModel.find({ isApproved: false })
    .populate('author', 'name profilePic')
    .skip(skip)
    .limit(limit);

  const total = await CourseModel.countDocuments({ isApproved: false });

  res.status(200).json({
    success: true,
    results: courses.length,
    total,
    page,
    totalPages: Math.ceil(total / limit),
    data: courses,
  });
});

const approveCourse = catchAsync(async (req, res, next) => {
  const course = await CourseModel.findByIdAndUpdate(
    req.params.id,
    { isApproved: true },
    { new: true, runValidators: true },
  );

  if (!course) {
    return next(new AppError('No course found with that ID', 404));
  }

  res.status(200).json({
    success: true,
    data: course,
  });
});

const getSingleCourse = catchAsync(async (req, res, next) => {
  const course = await CourseModel.findById(req.params.id).populate(
    'author',
    'name profilePic',
  );

  if (!course) {
    return next(new AppError('No course found with that ID', 404));
  }
  res.status(200).json({
    success: true,
    data: course,
  });
});

const updateCourse = catchAsync(async (req, res, next) => {
  const updatedCourse = await CourseModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    },
  );
  if (!updatedCourse) {
    return next(new AppError('No course found with that ID', 404));
  }
  res.status(200).json({
    success: true,
    data: updatedCourse,
  });
});

const deleteCourse = catchAsync(async (req, res, next) => {
  const deletedCourse = await CourseModel.findByIdAndDelete(req.params.id);
  if (!deletedCourse) {
    return next(new AppError('No course found with that ID', 404));
  }
  res.status(204).json({
    success: true,
    data: null,
  });
});

module.exports = {
  createCourse,
  getAllCourses,
  getUnapprovedCourses,
  approveCourse,
  getSingleCourse,
  updateCourse,
  deleteCourse,
};
