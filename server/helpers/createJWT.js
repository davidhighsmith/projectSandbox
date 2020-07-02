const jwt = require('jsonwebtoken');
require('dotenv').config();

const createJWT = (user, res, next, rememberMe = false) => {
  const payload = {
    user: {
      id: user.id,
    },
  };

  jwt.sign(
    payload,
    process.env.JWT_SECRET,
    { expiresIn: '1d' },
    (err, token) => {
      if (err) {
        return next(err);
      }

      return res.json({
        token,
      });
    }
  );
};

module.exports = createJWT;
