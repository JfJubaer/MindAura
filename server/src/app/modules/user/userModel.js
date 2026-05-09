/* eslint-disable no-unused-vars */
'use strict';

// Importing mongoose and Schema
const mongoose = require('mongoose');
const validator = require('validator').default;
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

// Creating a schema
const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
    },

    phone: {
      type: String,
      required: [true, 'Phone Number is Required!'],
      unique: true,
    },

    email: {
      type: String,
      required: false,
      lowercase: true,
    },

    password: {
      type: String,
      required: [true, 'Password is required'],
      select: false,
    },

    profilePic: {
      type: String,
      default: '',
    },

    registered_at: {
      type: Date,
      default: Date.now,
      immutable: true,
    },

    role: {
      type: String,
      enum: ['admin', 'teacher', 'user'],
      default: 'user',
    },

    is_email_verified: {
      type: Boolean,
      default: false,
    },

    password_changed_at: {
      type: Date,
      default: null,
      select: false,
    },

    deletedAt: {
      type: Date,
      default: null,
      select: false,
    },
  },
  {
    timestamps: true,
    toObject: {
      virtuals: true,
    },
    toJSON: {
      virtuals: true,
    },
  },
);

// Encrypt the password
userSchema.pre(['save'], async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.password_changed_at = Date.now();
  next();
});

// Automatically delete oldest notifications
userSchema.pre('save', function (next) {
  if (this.notifications.length > 10) {
    this.notifications = this.notifications.slice(-10);
  }
  next();
});

// Check if the user changed password after JWT issued
userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.password_changed_at) {
    const timestamp = parseInt(this.password_changed_at.getTime() / 1000, 10);
    return JWTTimestamp < timestamp;
  }
  return false;
};

// Creating model from schema
const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;
