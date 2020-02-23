const mongoose = require('mongoose')

const chirpSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'user'
  },
  content: {
    type: String,
    required: true,
    max: 256
  },
  retweets: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
      }
    }
  ],
  likes: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
      }
    }
  ]
})

module.exports = mongoose.model('Chirp', chirpSchema)
