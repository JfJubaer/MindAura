'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const enrolledCourseItemSchema = new Schema(
  {
    courseId: {
      type: Schema.Types.ObjectId,
      ref: 'Course',
      required: [true, 'Course ID is required'],
    },
    progress: {
      type: Number,
      default: 0,
      min: [0, 'Progress cannot be less than 0'],
      max: [100, 'Progress cannot be more than 100'],
    },
  },
  { _id: false },
);

const enrollmentSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User ID is required'],
      unique: true,
    },
    enrolledCourses: [enrolledCourseItemSchema],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

const EnrollmentModel = mongoose.model('Enrollment', enrollmentSchema);

module.exports = EnrollmentModel;
