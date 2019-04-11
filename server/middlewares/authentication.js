const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  if (req.headers.hasOwnProperty('access_token')) {
    try {
      var decoded = jwt.verify(req.headers.access_token, process.env.JWT_SECRET)
      req.data = decoded
      next()
    } catch(e) {
      res.status(400).json({
        message: 'INVALID TOKEN'
      })
    }
  } else {
    res.status(400).json({
      message: 'PLEASE LOGIN AND GET TOKEN'
    })
  }
}