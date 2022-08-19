const mongoose = require('mongoose')
require('dotenv').config()

const MONGO_URI = process.env.MONGO_URI
const DB_NAME = process.env.DB_NAME

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: DB_NAME
})

module.exports = mongoose.connection