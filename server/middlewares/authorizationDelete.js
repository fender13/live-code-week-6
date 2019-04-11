const Joke = require('../models/joke')

module.exports = (req, res, next) => {
  let getId = { _id: req.params.id }
  
  Joke.findById(getId)
      .then((data) => {
        if (data) {
          if (data.UserId == req.data.id) {
            req.joke = data
            next()
          } else {
            throw `Dilarang Delete yang Bukan Kepunyaan nya`
          }
        } else {
          throw 'DATA TIDAK TERSEDIA DI DATABASE'
        }
      })
      .catch((err) => {
        res.status(400).json({
          message: err
        })
      })
  
}