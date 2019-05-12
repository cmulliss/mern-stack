const express = require('express')
const connectDB = require('./config/db')

const app = express()
// connect DB
connectDB()

// init middleware
// app.use(express.json({ extended: false }))

// create single endpoint for testing, and put in our callback with request response, to res.send which will just send data to the browser
app.get('/', (req, res) => res.send('API running'))

// Define routes
app.use('/api/users', require('./routes/api/users'))
app.use('/api/auth', require('./routes/api/auth'))
app.use('/api/profile', require('./routes/api/profile'))
app.use('/api/posts', require('./routes/api/posts'))

const PORT = process.env.PORT || 5000
// port and callback
app.listen(PORT, () => console.log(`Server started on port ${PORT} `))

// add some script to package.json, then use 'npm run server'
// have created 4 routes files, need to be able to access them.

// Going to keep our end points restful, meaning that if we make a GET request to the the api/users it will get those users, but that's not functionality, we are actually using, so not doing that!

// use 'npm run server' to start

// to create a model we need a schema
