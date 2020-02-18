const mongoose = require('mongoose');

const userProfileSchema = new mongoose.Schema({
    user : {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'user'
    },
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        max: 32
    },
    bio: {
        type: String,
        max: 120
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
})

module.exports = mongoose.model('Profile', userProfileSchema);
