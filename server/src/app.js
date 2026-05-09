'use strict';

// Imports
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const errorHandler = require('./app/middlewares/errorHandler');
const cookieParser = require('cookie-parser');
const expressMongoSanitize = require('express-mongo-sanitize');
const xssClean = require('xss-clean');
const compression = require('compression');
const path = require('path');
const cors = require('cors');
const router = require('./app/route');

// const swaggerUi = require('swagger-ui-express');
// const swaggerDocument = require('./swagger.json');

// Creating the express app
const app = express();

const BASE_DOMAIN = 'spiderpie.com';
const ALLOWED_ORIGINS = [
  'https://wisdora-client.vercel.app',
  'http://localhost:3000',
];

const corsOptions = {
  origin: function (origin, callback) {
    // 1️⃣ Allow any origin in development
    if (process.env.NODE_ENV !== 'production') {
      return callback(null, true);
    }

    // 2️⃣ Allow requests with no origin (Postman, curl, mobile apps)
    if (!origin) return callback(null, true);

    try {
      // 3️⃣ Check if origin is in allowed list
      if (ALLOWED_ORIGINS.includes(origin)) {
        return callback(null, true);
      }

      const url = new URL(origin);
      const hostname = url.hostname;

      // 4️⃣ Allow base domain and any subdomain
      if (hostname === BASE_DOMAIN || hostname.endsWith(`.${BASE_DOMAIN}`)) {
        return callback(null, true);
      }

      console.error(`CORS Blocked for origin: ${origin}`);
      return callback(new Error('Not allowed by CORS'));
    } catch (err) {
      console.error(`Invalid origin: ${origin}`);
      return callback(new Error('Invalid origin'));
    }
  },

  credentials: true, // Allows cookies and Authorization headers
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
};

// Apply the middleware
app.use(cors(corsOptions));

// Security Middleware
app.use(helmet());
// Compression Middleware
app.use(compression());

// Parsing JSON, Form-Data and Cookies
app.use(express.json({ limit: '1000kb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Static Directory
app.use('/files', express.static(path.join(__dirname, 'public/storage/files')));
app.use(express.static(path.join(__dirname, 'client/build/')));

// Sanitizing user data
app.use(expressMongoSanitize());

// Prevent XSS attacks
app.use(xssClean());

if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

// Register the routers
app.use('/api/v1', router);

// Using the errorHandler middleware
app.use(errorHandler);

// Exporting the app
module.exports = app;
