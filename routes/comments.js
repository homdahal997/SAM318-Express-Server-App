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

// Creating a Comment (POST)
router.post('/comments', (req, res, next) => {
    if (req.body.post_id && req.body.author_id && req.body.content && req.body.timestamp) {
        const comment = {
            id: comments[comments.length - 1].id + 1,
            post_id: req.body.post_id,
            author_id: req.body.author_id,
            content: req.body.content,
            timestamp: new Date().toISOString(),
        };

        comments.push(comment);
        res.json(comments[comments.length - 1]);
    } else next(new Error('Insufficient Data'));
});

// Updating a Comment (PATCH)
router.patch('/:id', (req, res, next) => {
    const comment = comments.find((c, i) => {
        if (c.id == req.params.id) {
            for (const key in req.body) {
                comments[i][key] = req.body[key];
            }
            return true;
        }
    });

    if (comment) res.json(comment);
    else next();
});

module.exports = router;