function error(status, msg) {
    const err = new Error(msg);
    err.status = status;
    return err;
}

// This line exports the 'error' function so it can be used in other parts of the application.
module.exports = error;