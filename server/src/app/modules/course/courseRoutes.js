'use strict';

const express = require('express');
const {
  createCourse,
  getAllCourses,
  getSingleCourse,
  updateCourse,
  deleteCourse,
  getUnapprovedCourses,
  approveCourse,
} = require('./courseController');
const {
  verifyToken,
  restrictTo,
} = require('../../middlewares/auth-guards/authMiddleware');

const courseRouter = express.Router();

courseRouter
  .route('/')
  .get(getAllCourses)
  .post(verifyToken, restrictTo('admin', 'teacher'), createCourse);

courseRouter
  .route('/unapproved')
  .get(verifyToken, restrictTo('admin'), getUnapprovedCourses);

courseRouter
  .route('/approve/:id')
  .patch(verifyToken, restrictTo('admin'), approveCourse);

courseRouter
  .route('/:id')
  .get(getSingleCourse)
  .patch(verifyToken, restrictTo('admin', 'teacher'), updateCourse)
  .delete(verifyToken, restrictTo('admin', 'teacher'), deleteCourse);

module.exports = courseRouter;
