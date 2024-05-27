// import express module 
const express = require("express");
// Import axios
// const axios = require('axios');

// Create an instance of an express application
const app = express();

// Define a port where server listens
const PORT = 3001;

const postRouter = require("./routes/posts.js");
const commentRouter = require("./routes/comments.js")
const error = require("./utilities/error.js");

// Set 'pug' as the view engine for the application
app.set('view engine', 'pug');
// We use the body-parser middleware FIRST so that
// we have access to the parsed data within our routes.
// The parsed data will be located in "req.body".
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ extended: true }));

// This middleware serves static files from the 'public' directory.
app.use(express.static('public'));

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
app.use('/', postRouter); // for pug view

app.use('/api/v1', postRouter);

// comment routes
app.use('/api/v1', commentRouter);
//app.use("/posts",postRouter)

// Custom 404 (not found) middleware.
// Since we place this last, it will only process
// if no other routes have already sent a response!
// We also don't need next(), since this is the
// last stop along the request-response cycle.
app.use((req, res, next) => {
    next(error(404, 'Resource Not Found'));
});

// Error-handling middleware.
// Any call to next() that includes an
// Error() will skip regular middleware and
// only be processed by error-handling middleware.
// This changes our error handling throughout the application,
// but allows us to change the processing of ALL errors
// at once in a single location, which is important for
// scalability and maintainability.
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({ error: err.message });
});

// start the server and listen on the defined port
// app.listen() takes two paramenter, the port and callback function
// the callback function will be executed once the server is running indication port.
app.listen(PORT, () => {
    console.log(`The server is running on port: ${PORT}`);
});
