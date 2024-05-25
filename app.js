// import express module 
const express = require("express");

// Create an instance of an express application
const app = express();

// Define a port where server listens
const PORT = 3001;

const postRouter = require("./routes/posts.js");
const error = require("./utilities/error.js");

// We use the body-parser middleware FIRST so that
// we have access to the parsed data within our routes.
// The parsed data will be located in "req.body".
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ extended: true }));

// New logging middleware to help us keep track of
// requests during testing!
app.use((req, res, next) => {
    const time = new Date();

    console.log(
        `-----
${time.toLocaleTimeString()}: Received a ${req.method} request to ${req.url}.`
    );
    // This checks if there are keys in the req.body object (sent from the client)
    if (Object.keys(req.body).length > 0) {
        console.log('Containing the data:');
        console.log(`${JSON.stringify(req.body)}`);
    }
    next();
});

// API ROUTES
// Post Routes
app.use('/api/posts', postRouter);

// start the server and listen on the defined port
// app.listen() takes two paramenter, the port and callback function
// the callback function will be executed once the server is running indication port.
app.listen(PORT, () => {
    console.log(`The server is running on port: ${PORT}`);
});
