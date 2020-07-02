const jwt = require('jsonwebtoken');
require('dotenv').config();

const isLoggedIn = (req, res, next) => {
  // Get token from header
  const token = req.header('x-auth-token');

  if (!token) {
    const error = new Error('Not Authorized');
    res.status(401);
    return next(error);
  }

  try {
    const decodedUser = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decodedUser.user;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = isLoggedIn;
