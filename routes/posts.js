const express = require('express');
const router = express.Router();
//Importing the data from our fake database file
const posts = require('../data/posts.js');

//////////////////
// BASE PATH
// - /api/posts
//////////////////

// Get the json data itself
router.get('/posts', (req, res) => {
    const baseURL = 'http://localhost:3001';
    const postsWithLinks = posts.map(p => {
        return {
            ...p,
            links: [
                { rel: 'self', href: `${baseURL}/api/posts/${p.id}` },
            ],
        };
    });

    res.json({ posts: postsWithLinks });
});

// Render data in index file
router.get('/', (req, res) => {
    res.render('index', { posts });
});

module.exports = router;