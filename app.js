// import express module 
const express = require("express");

// Create an instance of an express application
const app = express();

// Define a port where server listens
const PORT = 3000;

// start the server and listen on the defined port
// app.listen() takes two paramenter, the port and callback function
// the callback function will be executed once the server is running indication port.
app.listen(PORT, () => {
    console.log(`The server is running on port: ${PORT}`);
});