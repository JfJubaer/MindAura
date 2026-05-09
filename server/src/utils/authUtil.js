const jwt = require('jsonwebtoken');
const {
  adminRole,
  teacherRole,
  userRole,
} = require('../app/modules/user/roles');

const getJwtByUserRole = role => {
  switch (role) {
    case adminRole:
      return process.env.JWT_SECRET;
    case teacherRole:
      return process.env.JWT_SECRET;
    case userRole:
      return process.env.JWT_SECRET;
    default:
      return '';
  }
};

// Signing a token
const signToken = (role, userDoc) => {
  const jwtSecret = getJwtByUserRole(role);

  const payload = {
    id: userDoc._id,
    role: role,
    name: userDoc.name,
    phone: userDoc.phone,
    email: userDoc.email
  };

  return jwt.sign(payload, jwtSecret, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};

// Send token to client
const sendToken = (role, userDoc, statusCode, res) => {
  const token = signToken(role, userDoc);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000,
    ),
    httpOnly: true,
  };
  // if (process.env.NODE_ENV == 'production') cookieOptions.secure = true;
  res.cookie('jwt', token, cookieOptions);
  res.status(statusCode).json({
    success: true,
    token,
  });
};

module.exports = {
  signToken,
  sendToken,
};
