const mongoose = require('mongoose');
const crypto = require('crypto'); // This comes packed with node.js

// user schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        max: 32
    },
    email: {
        type: String,
        trim: true,
        unique: true,
        required: true,
        lowercase: true
    },
    hashed_password: {
        type: String,
        required: true
    },
    salt: String
}, { timestamps: true })

// virtual
userSchema.virtual('password') // accept plain-text password
.set(function(password) {
    this._password = password; // temporary variable inside function
    this.salt = this.makeSalt();
    this.hashed_password = this.encryptPassword(password); // generate hashed password
})
.get(function() {
    return this._password;
})

// methods
userSchema.methods = {
    authenticate: function(plainText) {
        // if hashed plainText password matches hashed pass in DB
        return this.encryptPassword(plainText) === this.hashed_password;
    },

    encryptPassword: function(password) {
        if(!password) return ''
        try { // try to hash the password

            return crypto
                .createHmac('sha256', this.salt)
                .update(password)
                .digest('hex');

        } catch(error) {
            return ''
        }
    },

    makeSalt: function() {
        return Math.round(new Date().valueOf() * Math.random()) + '';
    }
}

module.exports = mongoose.model('User', userSchema);
