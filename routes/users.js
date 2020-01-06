const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const config = require('config');

const User = require('../models/User');

// @route     POST api/users
// @desc      Register a user
// @access    Public
router.post(
  '/',
  [
    // Validate user inputs.
    // Validate name.
    check('name', 'Please enter your name!')
      .not()
      .isEmpty(),
    // Validate email.
    check('email', 'Please enter a valid email!').isEmail(),
    // Validate password.
    check('password')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 chars long!')
      .matches(/\d/)
      .withMessage('Password must contain a number!')
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // Return errors with 400 status.
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password } = req.body;
    try {
      // Check if email is already taken by another user.
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({
          msg: 'Email is already taken. Please provide another valid email!'
        });
      }
      // Create new user.
      user = new User({
        name,
        email,
        password
      });
      // Create salt for password encryption.
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      await user.save();
      const payload = {
        user: {
          id: user.id
        }
      };
      // Register Json Web Token.
      jwt.sign(
        payload,
        config.get('jwtSecret'),
        {
          expiresIn: 3600
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server error. Please try again later!');
    }
  }
);

module.exports = router;
