// Entry-point of backend
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express(); // invoke express -> store express app in app variable

// connect mongoose to MongoDB Atlas
mongoose.connect(process.env.ATLAS_URI, {
        useNewUrlParser: true,
        useFindAndModify: false,
        useCreateIndex: true,
        useUnifiedTopology: true })
    .then(() => console.log('DB connected'))
    // handle errors on initial connection
    .catch(err => console.error('DB CONNECTION ERROR: ', err));

// handle errors after connection is established
mongoose.connection.on('error', err => {
    console.error(err);
});

// import routes
const authRouter = require('./routes/auth');
const profileRouter = require('./routes/profile');
const chirpRouter = require('./routes/chirp');

// middleware
// morgan for better development experience
app.use(morgan('dev'));
app.use(express.json());
// app.use(cors()); // allows all origins
if ((process.env.NODE_ENV == 'development')) {
    app.use(cors({ origin: 'http://localhost:3000' }));
}

// router middleware
app.use('/api', authRouter);
app.use('/api', profileRouter);
app.use('/api', chirpRouter);

const PORT = process.env.PORT || 8000; // .env file port # or 8000
// start server/listen on port
app.listen(PORT, () => {
    // callback function on success
    console.log(`API is running on port ${PORT}`);
});