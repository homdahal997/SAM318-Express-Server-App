const express = require('express');
const router = express.Router();
//Importing the data from our fake database file
const posts = require('../data/posts.js');
const authors = require("../data/authors.js")
const comments = require("../data/comments.js");

// Creating a GET route for the entire users database.
// This would be impractical in larger data sets.
// GET /api/users
router.get('/comments', (req, res) => {
    const links = [
        {
            href: 'comments/:id',
            rel: ':id',
            type: 'GET',
        },
    ];

    res.json({ comments, links });
});

module.exports = router;