'use strict';

const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: process.env.RATE_LIMIT_RESETS * 60 * 1000, // use RATE_LIMIT_RESETS
  max: process.env.RATE_LIMIT,
  message: 'Reached request limit',
});

module.exports = limiter;
