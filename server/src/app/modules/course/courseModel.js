'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const courseSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Course name is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Course description is required'],
    },
    price: {
      type: Number,
      required: [true, 'Course price is required'],
      default: 0, // 00 means free
    },
    rating: {
      type: Number,
      default: 0,
      min: [0, 'Rating must be at least 0'],
      max: [5, 'Rating must be at most 5'],
    },
    thumbnailUrl: {
      type: String,
      required: [true, 'Thumbnail URL is required'],
    },
    classes: [
      {
        name: {
          type: String,
          required: [true, 'Class name is required'],
        },
        videoUrl: {
          type: String,
          required: [true, 'Video URL is required'],
        },
        thumbnailUrl: {
          type: String,
          required: [true, 'Thumbnail URL is required'],
        },
        des: {
          type: String,
          required: [true, 'Description is required'],
        },
      },
    ],
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Author is required'],
    },
    isApproved: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const CourseModel = mongoose.model('Course', courseSchema);

module.exports = CourseModel;
