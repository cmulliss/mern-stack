const mongoose = require('mongoose')
const config = require('config')
const db = config.get('mongoURI')

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false
    })

    console.log('MongoDB Connected...')
  } catch (err) {
    console.error(err.message)
    // Exit process with failure
    process.exit(1)
  }
}

module.exports = connectDB

// this will give us back a promise, could use dot.catch syntax, but using sync await as new standard. Makes code look cleaner and as if anysyn, althousgh isn't!

// added for deprecation warnings
// useNewUrlParser: true,
// useCreateIndex: true
