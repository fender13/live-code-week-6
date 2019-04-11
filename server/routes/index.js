const router = require('express').Router()
const controller = require('../controllers/index')

const authentication = require('../middlewares/authentication')

// authorization so save not double
const authorizationSaveJokes = require('../middlewares/authorizationSaveJokes')

// authorization delete
const authorizationDelete = require('../middlewares/authorizationDelete')

// register a user
router.post('/register', controller.userRegister)

// login a user
router.post('/login', controller.userLogin)

// verify token
router.get('/verify', authentication, (req, res) => {
  res.status(200).json({
    message: 'User is verified',
    username: req.data.username
  })
})

// get a joke
router.get('/jokes', controller.getJokes)

// save a joke
router.post('/favorites', authentication, authorizationSaveJokes, controller.saveRandomJokes)

// get saved jokes
router.get('/saved', authentication, controller.getSavedJokes)

// remove a joke
router.delete('/favorites/:id', authentication, authorizationDelete, controller.deleteSaved)

module.exports = router