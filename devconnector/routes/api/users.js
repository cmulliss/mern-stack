const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator/check')

// need to bring in our user model
const User = require('../../models/User')

// for callback, => fn, with req res, bsically a test route, 3 things:
// @route POST api/users
// @desc Register user
// access Public
router.post(
  '/',
  [
    check('name', 'Name is required')
      .not()
      .isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 })
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    // destructure for req.body
    const { name, email, password } = req.body
    try {
      // see if user exists

      // get users gravatar

      // encrypt password using bcrytp

      // return jsonwebtoken, so logged in immediately

      res.send('User route')
    } catch (err) {
      console.error(err.message)
      res.status(500).send('Server error')
    }
  }
)

module.exports = router

// body parser included in express
// can send whatever data we want and access it with req.body
// in order for this to work, need to initialise the middleware for the body parser
// need to send a name, email and password to register a user
