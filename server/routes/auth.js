const router = require('express').Router();
const bcrypt = require('bcrypt');
const Joi = require('@hapi/joi');
const createJWT = require('../helpers/createJWT');

const User = require('../models/User');

const loginSchema = Joi.object({
  username: Joi.string().pattern(new RegExp('^[a-zA-Z0-9_]')).min(3).max(20),
  password: Joi.string().min(8),
});

function loginError(res, next) {
  const error = new Error('Invalid username or password.');
  res.status(422);
  return next(error);
}

// @route   POST api/auth
// @desc    Login a user
// @access  Public
router.post('/', async (req, res, next) => {
  const result = loginSchema.validate(req.body);
  if (result.error) {
    res.status(422);
    return next(result.error);
  }

  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return loginError(res, next);
    }

    const compare = await bcrypt.compare(password, user.password);
    if (!compare) {
      return loginError(res, next);
    }

    createJWT(user, res, next);
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
