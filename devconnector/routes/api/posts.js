const express = require('express')
const router = express.Router()

// for callback, => fn, with req res, bsically a test route, 3 things:
// @route GET api/posts
// @desc Test route
// access Public
router.get('/', (req, res) => res.send('Posts route'))

module.exports = router
