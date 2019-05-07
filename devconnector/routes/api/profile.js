const express = require('express')
const router = express.Router()

// for callback, => fn, with req res, bsically a test route, 3 things:
// @route GET api/profile
// @desc Test route
// access Public
router.get('/', (req, res) => res.send('Profile route'))

module.exports = router
