const express = require('express');
const router = express.Router();
//Importing the data from our fake database file
const posts = require('../data/posts.js');

//////////////////
// BASE PATH
// - /api/posts
//////////////////

// Creating a GET route for the entire posts database.
// This would be impractical in larger data sets.
router.get('/', (req, res) => {
    const links = [
        {
            href: 'posts/:id',
            rel: ':id',
            type: 'GET',
        },
    ];

    res.json({ posts, links });
});

module.exports = router;