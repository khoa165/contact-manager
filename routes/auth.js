const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const config = require('config');
const auth = require('../middleware/auth');

const User = require('../models/User');

// @route     GET api/auth
// @desc      Get logged in user
// @access    Private
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server error. Please try again later!');
  }
});

// @route     POST api/auth
// @desc      Auth user & get token
// @access    Public
router.post(
  '/',
  [
    // Validate user inputs.
    // Validate email.
    check('email', 'Please enter your account email!').isEmail(),
    // Validate password.
    check('password', 'Please enter your account password!').exists()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // Return errors with 400 status.
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      // Check if email entered by user exists.
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ msg: 'Invalid credentials. Please try again!' });
      }
      // Check if password matches.
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res
          .status(400)
          .json({ msg: 'Invalid credentials. Please try again!' });
      }
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
          expiresIn: 86400
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
