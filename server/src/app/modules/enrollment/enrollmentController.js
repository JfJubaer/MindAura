/* eslint-disable no-unused-vars */
'use strict';

const EnrollmentModel = require('./enrollmentModel');
const CourseModel = require('../course/courseModel');
const UserModel = require('../user/userModel');
const catchAsync = require('../../../utils/catchAsync');
const AppError = require('../../../errors/appError');

const buildUserWithEnrollments = async userId => {
  const user = await UserModel.findById(userId);
  if (!user) return null;

  const enrollment = await EnrollmentModel.findOne({ userId }).select(
    'enrolledCourses.courseId enrolledCourses.progress',
  );

  const userObject = user.toObject();
  userObject.enrolledCourses = enrollment
    ? enrollment.enrolledCourses.map(item => item.courseId)
    : [];
  userObject.enrolledCourseDetails = enrollment
    ? enrollment.enrolledCourses
    : [];

  return userObject;
};

const ensureCourseExists = async courseId => {
  const course = await CourseModel.findById(courseId).select('_id isApproved');

  if (!course || !course.isApproved) {
    throw new AppError('Course not found', 404);
  }

  return course;
};

const getOrCreateEnrollment = async userId => {
  let enrollment = await EnrollmentModel.findOne({ userId });

  if (!enrollment) {
    enrollment = await EnrollmentModel.create({
      userId,
      enrolledCourses: [],
    });
  }

  return enrollment;
};

const enrollInCourse = catchAsync(async (req, res, next) => {
  const courseId = req.body.courseId || req.params.courseId;
  const userId = req.user.id;

  if (!courseId) {
    return next(new AppError('Course ID is required', 400));
  }

  await ensureCourseExists(courseId);

  const enrollment = await getOrCreateEnrollment(userId);
  const alreadyEnrolled = enrollment.enrolledCourses.some(
    item => item.courseId.toString() === courseId,
  );

  if (alreadyEnrolled) {
    return next(new AppError('You are already enrolled in this course', 400));
  }

  enrollment.enrolledCourses.push({ courseId, progress: 0 });
  await enrollment.save();

  res.status(200).json({
    success: true,
    message: 'Successfully enrolled in course',
    data: enrollment,
  });
});

const unenrollFromCourse = catchAsync(async (req, res, next) => {
  const { courseId } = req.params;
  const userId = req.user.id;

  const enrollment = await EnrollmentModel.findOne({ userId });

  if (!enrollment) {
    return next(new AppError('Enrollment record not found', 404));
  }

  enrollment.enrolledCourses = enrollment.enrolledCourses.filter(
    item => item.courseId.toString() !== courseId,
  );
  await enrollment.save();

  res.status(200).json({
    success: true,
    message: 'Course removed from enrolled courses',
    data: enrollment,
  });
});

const updateCourseProgress = catchAsync(async (req, res, next) => {
  const { courseId } = req.params;
  const { progress } = req.body;
  const userId = req.user.id;

  if (typeof progress !== 'number' || Number.isNaN(progress)) {
    return next(new AppError('Progress must be a valid number', 400));
  }

  if (progress < 0 || progress > 100) {
    return next(new AppError('Progress must be between 0 and 100', 400));
  }

  const enrollment = await EnrollmentModel.findOne({ userId });

  if (!enrollment) {
    return next(new AppError('Enrollment record not found', 404));
  }

  const enrolledCourse = enrollment.enrolledCourses.find(
    item => item.courseId.toString() === courseId,
  );

  if (!enrolledCourse) {
    return next(new AppError('Course is not in your enrolled list', 404));
  }

  enrolledCourse.progress = progress;
  await enrollment.save();

  res.status(200).json({
    success: true,
    message: 'Course progress updated successfully',
    data: enrollment,
  });
});

const getMyEnrolledCourses = catchAsync(async (req, res, next) => {
  const userId = req.user.id;

  let enrollment = await getOrCreateEnrollment(userId);

  const populatedEnrollment = await EnrollmentModel.findById(
    enrollment._id,
  ).populate({
    path: 'enrolledCourses.courseId',
    select:
      'name description category price thumbnailUrl rating author classes',
    populate: {
      path: 'author',
      select: 'name profilePic',
    },
  });

  res.status(200).json({
    success: true,
    data: populatedEnrollment.enrolledCourses,
  });
});

const enrollViaUserRouteResponse = catchAsync(async (req, res, next) => {
  const { courseId } = req.params;
  const userId = req.user.id;

  if (!courseId) {
    return next(new AppError('Course ID is required', 400));
  }

  await ensureCourseExists(courseId);

  const enrollment = await getOrCreateEnrollment(userId);
  const alreadyEnrolled = enrollment.enrolledCourses.some(
    item => item.courseId.toString() === courseId,
  );

  if (alreadyEnrolled) {
    return next(new AppError('You are already enrolled in this course', 400));
  }

  enrollment.enrolledCourses.push({ courseId, progress: 0 });
  await enrollment.save();

  const enrichedUser = await buildUserWithEnrollments(userId);

  res.status(200).json({
    success: true,
    message: 'Successfully enrolled in course',
    body: { user: enrichedUser },
  });
});

module.exports = {
  buildUserWithEnrollments,
  enrollInCourse,
  enrollViaUserRouteResponse,
  unenrollFromCourse,
  updateCourseProgress,
  getMyEnrolledCourses,
};
