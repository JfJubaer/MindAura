'use strict';

// Importing functions from the controller
const {
  signUp,
  login,
  logout,
  getSingleUser,
} = require('./userController');

const { verifyToken } = require('../../middlewares/auth-guards/authMiddleware');

// Importing the express router
const userRouter = require('express').Router();

// Setting up the routes
userRouter.route('/sign-up').post(signUp);
userRouter.route('/login').post(login);
userRouter.route('/logout').post(verifyToken, logout);

// getuser route, secured with verifyToken
userRouter.route('/user').get(verifyToken, getSingleUser);

module.exports = userRouter;
