const router = require('express').Router();
const bcrypt = require('bcrypt');
const Joi = require('@hapi/joi');

const User = require('../models/User');

const registerSchema = Joi.object({
  username: Joi.string().pattern(new RegExp('^[a-zA-Z0-9_]')).min(3).max(20),
  password: Joi.string().min(8),
});

// @route   GET api/users
// @desc    Get all users
// @access  Public
router.get('/', async (req, res, next) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    return next(error);
  }
});

// @route   POST api/users
// @desc    Register user
// @access  Public
router.post('/', async (req, res, next) => {
  const result = registerSchema.validate(req.body);
  if (result.error) {
    res.status(422);
    return next(result.error);
  }

  const { username, password } = req.body;

  try {
    let user = await User.findOne({ username });

    if (user) {
      const error = new Error('User already exists.');
      res.status(409);
      return next(error);
    }

    user = new User({
      username,
      password,
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    res.json(user);
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
