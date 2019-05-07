const express = require('express')
const router = express.Router()

// for callback, => fn, with req res, bsically a test route, 3 things:
// @route GET api/auth
// @desc Test route
// access Public
router.get('/', (req, res) => res.send('Auth route'))

module.exports = router
