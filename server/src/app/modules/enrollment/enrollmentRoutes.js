'use strict';

const express = require('express');
const {
  enrollInCourse,
  unenrollFromCourse,
  updateCourseProgress,
  getMyEnrolledCourses,
} = require('./enrollmentController');
const { verifyToken } = require('../../middlewares/auth-guards/authMiddleware');

const enrollmentRouter = express.Router();

enrollmentRouter.use(verifyToken);

enrollmentRouter
  .route('/')
  .get(getMyEnrolledCourses)
  .post(enrollInCourse);

enrollmentRouter
  .route('/:courseId')
  .delete(unenrollFromCourse);

enrollmentRouter
  .route('/:courseId/progress')
  .patch(updateCourseProgress);

module.exports = enrollmentRouter;
