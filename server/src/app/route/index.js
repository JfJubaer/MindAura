('use strict');
// Importing the app error class
const AppError = require('../../errors/appError');

// Importing express router
const router = require('express').Router();

// Importing routers
const userRouter = require('../modules/user/userRoutes');
const uploadRouter = require('../modules/pictureUpload/uploadRoutes');

// Registering all routers
router.use('/users', userRouter);
router.use('/upload', uploadRouter);
// The 404 route
router.all('*', (req, res, next) =>
  next(new AppError('No Such Endpoint', 404)),
);

module.exports = router;
