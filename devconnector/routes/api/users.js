const express = require('express')
const router = express.Router()
const gravatar = require('gravatar')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
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
    // req.body lets us get data, destructure for req.body
    const { name, email, password } = req.body

    try {
      // find user and check if user exists
      let user = await User.findOne({ email })

      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already exists' }] })
      }
      // get users gravatar, then create instance of user
      const avatar = gravatar.url(email, {
        s: '200',
        r: 'pg',
        d: 'mm'
      })

      user = new User({
        name,
        email,
        avatar,
        password
      })
      // encrypt password using bcrypt
      // before encrypt passwrd, need a salt to do hashing, can get a promise from bcrypt.genSalt, so need to do await here, pass in rounds of 10, the more the more secure, but also the slower
      const salt = await bcrypt.genSalt(10)
      user.password = await bcrypt.hash(password, salt)
      // user.save gives a promise so await again (saves using .then etc, this is more elegant)
      await user.save()
      // return jsonwebtoken, to login on access protected routes, so logged in immediately
      // res.send('User registered')
      // this will give us a promise so can get that id
      const payload = {
        user: {
          id: user.id
        }
      }
      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err
          res.json({ token })
        }
      )
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
// with jwt pkg, we first sign it, then pass in our payload ands then have a callback where we send a response back to the client with that token. Later will need to protect our routes by creating a piece of middleware to verify the token.
// to get secret token, need to bring in default.json
// create user, hash password, save user in db, get the payload which includes the user.id, then sign the token, pass in the payload, pass in the secret and expiration.. Then inside the callback we'll get either an error or the token. If we get the token going to send token back to the client
