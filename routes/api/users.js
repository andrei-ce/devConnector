const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');
const User = require('../../models/User');

// @route   GET/users
// @desc    Test route
// @access  Public
router.get('/', (req, res) => res.send('User route test'));

// @route   POST/users
// @desc    Test route
// @access  Public
router.post(
  '/',
  [
    check('name', 'Name is required').notEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please use a password of min 6 characters').isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;
    //see if user exists
    try {
      let user = await User.findOne({ email });

      if (user) {
        return res.status(400).json({ errors: [{ msg: 'Email already registered' }] });
      }
      //get users gravatar

      const avatar = gravatar.url(email, {
        s: '200',
        r: 'pg',
        d: 'mm',
      });

      user = new User({
        name,
        email,
        password,
        avatar,
      });
      //encrypt password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      //save user with password hashed
      await user.save();

      //return jsonwebtoken
      const payload = {
        user: {
          id: user._id,
        },
      };

      jwt.sign(payload, config.get('jwtSecret'), { expiresIn: 3000 }, (err, token) => {
        if (err) throw err;
        console.log(`User '${user.name}' saved`);
        res.json({ token });
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error: on register user!');
    }
  }
);

module.exports = router;
