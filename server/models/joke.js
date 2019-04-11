const mongoose = require('mongoose')

const ENV = require('dotenv')
ENV.config()

const dbconnect = process.env.DB_NAME
mongoose.connect(`mongodb://localhost/${dbconnect}`, { useNewUrlParser: true })

const schema = mongoose.Schema

const JokeSchema = new schema({
  joke: {
    type: String,
    required: true
  }, 
  UserId: {
    type: schema.Types.ObjectId,
    required: true
  }
})

var Jokes = mongoose.model('Jokes', JokeSchema)

module.exports = Jokes