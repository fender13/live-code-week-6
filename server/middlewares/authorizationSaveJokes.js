const Joke = require('../models/joke')

module.exports = (req, res, next) => {
  Joke.findOne({
    joke: req.body.joke
  })
    
    .then((data) => {
      if (data) {
        throw 'JOKE SUDAH ADA DI DATABASE'
      } else {
        next()
      }
    })
    .catch((err) => {
      res.status(400).json({
        message: err
      })
    })
}