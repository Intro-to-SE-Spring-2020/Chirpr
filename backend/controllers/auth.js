const jwt = require('jsonwebtoken');

// import models
const User = require('../models/User');

exports.signup = (req, res) => {
    // 1: destruct name, email, password
    const { first_name, last_name, email, password } = req.body;

    // 2: check to see if email is in use
    User.findOne({email}).exec((err, user) => {
        if (user) {
            return res.status(400).json({
                errors: [{ msg: 'Email is already in use'}]
            })
        }
    })

    // 3: create new user
    let newUser = new User({ first_name, last_name, email, password });

    // 4: save user to DB
    newUser.save((err, success) => {
        if (err) {
            console.log('Registration Error: ', err);
            return res.status(400).json({
                errors: [{ msg: err }]
            });
        }
        res.json({
            msg: 'Registration success! Please sign in'
        })
    });
};

exports.signin = (req, res) => {
    // 1: destruct email and password
    const { email, password } = req.body;

    try {
        // 2: check if user exists
        User.findOne({ email }).exec((err, user) => {
            if (err || !user) { // no user or error
                return res.status(400).json({
                    error: 'User with that email does not exist. Please register'
                })
            }
            // 3: authenticate user
            if (!user.authenticate(password)) { // authenticate with user schema method
                return res.status(400).json({
                    error: 'Email and password do not match'
                })
            }

            // create payload
            const payload = {
                user: {
                    id: user.id
                }
            };

            // generate a token to send to client/react
            jwt.sign(
                payload,
                process.env.JWT_SECRET,
                { expiresIn: '3600' },
                (err, token) => {
                    if (err) throw err;
                    res.json({ token });
                }
            );
        })
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
};