const User = require('../models/user')
const Joke = require('../models/joke')

const jwt = require('jsonwebtoken')
const axios = require('axios')

const comparePassword = require('../helpers/comparePassword')

class IndexController {
  static userRegister(req, res) {
    const { email, password } = req.body

    User.create({
      email: email,
      password: password
    })
    .then((data) => {
      res.status(201).json(data)
    })
    .catch((err) => {
      let errors = {}

      if (err.errors.email != undefined || err.errors.password != undefined) {
        errors.email = err.errors.email
        errors.password = err.errors.password
        
        res.status(400).json(errors)
      } else {
        res.status(500).json({
          message: `Terjadi kesalahan pada server..Cobalah beberapa saat lagi!!!`
        })
      }
    })
  }

  static userLogin(req, res) {
    const { email, password } = req. body
    let dataUser

    User.findOne({
        email: email
    })
      .then((user) => {
        dataUser = user
        if (!user) {
          throw  'EMAIL ATAU PASSWORD ANDA SALAH'
        } else {
          return comparePassword(password, dataUser.password)
        }
      })

      .then((result) => {
        if (!result) {
          throw  'EMAIL ATAU PASSWORD ANDA SALAH'
        } else {
          const payload = {
            id: dataUser._id,
            email: dataUser.email
          }
          const token = jwt.sign(payload, process.env.JWT_SECRET)
          res.status(200).json({
            token: token,
            id: dataUser._id,
            email: dataUser.email
          })
        }
      })
      
      .catch((err) => {
        res.status(400).json({
          message: err
        })
      })
  }

  static getJokes(req, res) {
    axios
      .get(`https://icanhazdadjoke.com`, {
        headers: { Accept: 'text/plain' }
      })

      .then(({ data }) => {
        res.status(200).json({
          jokes: data
        })
      })

      .catch(({ response }) => {
        console.log(response)
      })
  }

  static saveRandomJokes(req, res) {
    Joke
      .create({
        joke: req.body.joke,
        UserId: req.data.id
      })

      .then((data) => {
        res.status(201).json(data)
      })

      .catch(({ response }) => {
        console.log(response)
      })
  }

  static getSavedJokes(req, res) {
    Joke
      .find({
        UserId: req.data.id
      })
      
      .then((data) => {
        res.status(200).json(data)
      })

      .catch(({ response }) => {
        console.log(response)
      })
  }

  static deleteSaved(req, res) {
    Joke
      .findByIdAndDelete(req.joke._id)

      .then((data) => {
        res.status(200).json(data)
      })
      
      .catch(({ response }) => {
        console.log(response)
      })
  }
 
}

module.exports = IndexController