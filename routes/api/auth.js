const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');

const User = require('../../models/User');

// @route   GET/auth
// @desc    Test route
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    //req.user comes from auth middleware and contains only one thing: {id: user._id}
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error.');
  }
});

// @route   POST/auth/login
// @desc    Authenticate user & get token
// @access  Public
router.post(
  '/',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please is required').notEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    //see if user exists
    try {
      let user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ errors: [{ msg: 'Invalid credentials.' }] });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ errors: [{ msg: 'Invalid credentials.' }] });
      }

      //if both tests are passed, then return jsonwebtoken
      const payload = {
        user: {
          id: user._id,
        },
      };

      jwt.sign(payload, config.get('jwtSecret'), { expiresIn: 3000000 }, (err, token) => {
        if (err) throw err;
        console.log(`User '${user.name}' logged in`);
        res.json({ token });
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error: on register user!');
    }
  }
);

module.exports = router;
