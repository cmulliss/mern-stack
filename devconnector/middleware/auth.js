const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = function (req, res, next) {
  // get token  from header
  const token = req.header('x-auth-token')
  // check if no token
  if (!token) {
    return res.status(401).json({ msg: 'no token, authorisation denied' })
  }
  // verify token
  try {
    const decoded = jwt.verify(token, config.get('jwtSecret'))
    req.user = decoded.user
    next()
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' })
  }
}

// a middleware fn is basically just a fn that has access to the request and response cycle / objects and next is actually a callback that we have to run once we are done so that it moves on the next piece of middleware

// since this is a middleware fn it's going to take in 3 things, request, response and next, basically a fn that has access to the request response cycle, and next is actually a callback that we have to run once we are done, so that it moves on to the next piece of middleware.
