function tryCatch(handler) {
  return async function (req, res, next) {
    try {
      await handler(req, res, next)
    } catch (error) {
      console.error(error)
      if (error.name = 'MongoServerError') {
        switch (error.code) {
          case 11000:
            res.json({ error: `${Object.keys(error.keyPattern)} already in use` })
            break
          default:
            res.json({ error: 'Database error' })
        }

      } else {
        res.json({ error: 'Server error' })
      }

    }
  }
}

module.exports = tryCatch