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
  const { searchTerm, category, minPrice, maxPrice, sortBy, page = 1, limit = 10 } = req.query;
  
  const query = { isApproved: true };
  const filters = [];

  // 1. Search Logic
  if (searchTerm) {
    filters.push({
      $or: [
        { name: { $regex: searchTerm, $options: 'i' } },
        { description: { $regex: searchTerm, $options: 'i' } }
      ]
    });
  }

  // 2. Category Filtering
  if (category && category !== 'All') {
    if (category === 'Other') {
      filters.push({
        $or: [{ category: 'Other' }, { category: { $exists: false } }, { category: null }]
      });
    } else {
      filters.push({ category: { $regex: `^${category}$`, $options: 'i' } });
    }
  }

  // 3. Price Filtering
  if (minPrice || maxPrice) {
    const priceFilter = {};
    if (minPrice) priceFilter.$gte = Number(minPrice);
    if (maxPrice) priceFilter.$lte = Number(maxPrice);
    filters.push({ price: priceFilter });
  }

  if (filters.length > 0) {
    query.$and = filters;
  }

  console.log('Final Query:', JSON.stringify(query, null, 2));

  // 4. Sorting Logic
  let sortOptions = { createdAt: -1 }; // Default: Newest first
  if (sortBy) {
    if (sortBy === 'price-low') sortOptions = { price: 1 };
    else if (sortBy === 'price-high') sortOptions = { price: -1 };
    else if (sortBy === 'rating') sortOptions = { rating: -1 };
  }

  const skip = (parseInt(page) - 1) * parseInt(limit);

  const courses = await CourseModel.find(query)
    .populate('author', 'name profilePic')
    .select('name description category price rating thumbnailUrl classes author createdAt updatedAt')
    .sort(sortOptions)
    .skip(skip)
    .limit(parseInt(limit));

  const total = await CourseModel.countDocuments(query);

  res.status(200).json({
    success: true,
    results: courses.length,
    total,
    page: parseInt(page),
    totalPages: Math.ceil(total / limit),
    data: courses,
  });
});

const getUnapprovedCourses = catchAsync(async (req, res, next) => {
  const { page = 1, limit = 10 } = req.query;
  const skip = (parseInt(page) - 1) * parseInt(limit);

  const courses = await CourseModel.find({ isApproved: false })
    .populate('author', 'name profilePic')
    .select('name description category price rating thumbnailUrl classes author createdAt updatedAt')
    .skip(skip)
    .limit(parseInt(limit));

  const total = await CourseModel.countDocuments({ isApproved: false });

  res.status(200).json({
    success: true,
    results: courses.length,
    total,
    page: parseInt(page),
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
  const course = await CourseModel.findById(req.params.id)
    .populate('author', 'name profilePic')
    .select('name description category price rating thumbnailUrl classes author createdAt updatedAt isApproved');

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
