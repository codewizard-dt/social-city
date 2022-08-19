const express = require('express')
const path = require('path')

const app = express()
const db = require('./config/connection')
const router = require('./routes')
const PORT = process.env.PORT || 3001

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(router)

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`Server running http://localhost:${PORT}`)
  })
})