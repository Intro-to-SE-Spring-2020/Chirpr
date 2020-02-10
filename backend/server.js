// Entry-point of backend
const express = require('express');

const app = express(); // invoke express -> store express app in app variable

const port = process.env.port || 8000; // .env file port # or 8000
// start server/listen on port
app.listen(port, () => {
    // callback function on success
    console.log(`API is running on port ${port}`);
});