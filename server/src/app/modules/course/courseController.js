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
  const courses = await CourseModel.find().populate('author', 'name profilePic');
  res.status(200).json({
    success: true,
    results: courses.length,
    data: courses,
  });
});

const getSingleCourse = catchAsync(async (req, res, next) => {
  const course = await CourseModel.findById(req.params.id)
    .populate('author', 'name profilePic');
    
  if (!course) {
    return next(new AppError('No course found with that ID', 404));
  }
  res.status(200).json({
    success: true,
    data: course,
  });
});

const updateCourse = catchAsync(async (req, res, next) => {
  const updatedCourse = await CourseModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
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
  getSingleCourse,
  updateCourse,
  deleteCourse,
};
