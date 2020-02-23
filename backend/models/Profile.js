const mongoose = require('mongoose')

const userProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'user'
  },
  first_name: {
    type: String,
    trim: true,
    required: true,
    max: 32
  },
  last_name: {
    type: String,
    trim: true,
    required: true,
    max: 32
  },
  username: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true,
    max: 32
  },
  bio: {
    type: String,
    max: 120
  },
  dob: {
    type: String,
    required: true
  },
  following: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
      }
    }
  ],
  followers: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
      }
    }
  ]
}, { timestamps: true })

module.exports = mongoose.model('Profile', userProfileSchema)
