'use strict';

const express = require('express');
const {
  createCourse,
  getAllCourses,
  getSingleCourse,
  updateCourse,
  deleteCourse,
} = require('./courseController');
const { verifyToken, restrictTo } = require('../../middlewares/auth-guards/authMiddleware');

const courseRouter = express.Router();

courseRouter.route('/')
  .get(getAllCourses)
  .post(verifyToken, restrictTo('admin', 'teacher'), createCourse);

courseRouter.route('/:id')
  .get(getSingleCourse)
  .patch(verifyToken, restrictTo('admin', 'teacher'), updateCourse)
  .delete(verifyToken, restrictTo('admin', 'teacher'), deleteCourse);

module.exports = courseRouter;
