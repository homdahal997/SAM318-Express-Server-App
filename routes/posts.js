const express = require('express');
const router = express.Router();
//Importing the data from our fake database file
const posts = require('../data/posts.js');
const authors = require("../data/authors.js")
const comments = require("../data/comments.js");

//////////////////
// BASE PATH
// - /api/posts
//////////////////

// Get the json data itself
router.get('/posts', (req, res) => {
    const baseURL = 'http://localhost:3001';
    const postsWithLinks = posts.map(p => {
        const author = authors.find(author => author.id == p.author_id);
        console.log(author)
        
        return {
            ...p,
            author_name: author ? author.name : 'Author not found',
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

router.get('/posts/:id', (req, res) => {
    const post = posts.find(p => p.id == req.params.id);
    const postComments = comments.filter(c => c.post_id == req.params.id);
    if (!post) {
        res.status(404).send('Post not found');
    } else {
        res.render('singlepost', { post, comments: postComments });
    }
});

router.post('/posts/:id/comments', (req, res) => {
    const newComment = {
        id: comments.length + 1,
        post_id: req.params.id,
        author_id: req.body.author_id,
        content: req.body.content,
        timestamp: new Date().toISOString()
    };

    comments.push(newComment);

    res.redirect(`/posts/${req.params.id}`);
});


module.exports = router;