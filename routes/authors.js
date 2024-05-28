const express = require('express');
const router = express.Router();
//Importing the data from our fake database file
const posts = require('../data/posts.js');
const authors = require("../data/authors.js")
const comments = require("../data/comments.js");

// Creating a GET route for the entire users database.
// This would be impractical in larger data sets.
// GET /api/users
router.get('/authors', (req, res) => {
    const links = [
        {
            href: 'authors/:id',
            rel: ':id',
            type: 'GET',
        },
    ];

    res.json({ authors, links });
});

// Creating an Author (POST)
router.post('/authors', (req, res, next) => {
    if (req.body.name && req.body.email) {
        const author = {
            id: authors[authors.length - 1].id + 1,
            name: req.body.name,
            email: req.body.email,
        };

        authors.push(author);
        res.json(authors[authors.length - 1]);
    } else next(new Error('Insufficient Data'));
});

// Updating an Author (PATCH)
router.patch('/:id', (req, res, next) => {
    const author = authors.find((a, i) => {
        if (a.id == req.params.id) {
            for (const key in req.body) {
                authors[i][key] = req.body[key];
            }
            return true;
        }
    });

    if (author) res.json(author);
    else next();
});

module.exports = router;