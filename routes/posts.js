const express = require('express');
const router = express.Router();
//Importing the data from our fake database file
const posts = require('../data/posts.js');
const authors = require("../data/authors.js")
const comments = require("../data/comments.js");


//////////////////
// BASE PATH
// - /api/v1
//////////////////

// Define a GET route for '/posts'
router.get('/posts', (req, res) => {
    // Define the base URL of the API
    const baseURL = 'http://localhost:3001';
    const postsWithLinks = posts.map(p => {
        console.log(p.author_id);
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

// Creating a Post (POST)
router.post('/', (req, res, next) => {
    // Within the POST request route, we create a new
    // post with the data given by the client.
    // We should also do some more robust validation here,
    // but this is just an example for now.
    if (req.body.userId && req.body.title && req.body.content && req.body.author_id && req.body.timestamp && req.body.image_url) {
        const post = {
            id: posts[posts.length - 1].id + 1,
            title: req.body.title,
            content: req.body.content,
            author_id: req.body.author_id,
            timestamp: new Date().toISOString(),
            image_url: req.body.image_url,
        };

        posts.push(post);
        res.json(posts[posts.length - 1]);
    } else next(new Error('Insufficient Data'));
});

router.patch('/:id', (req, res) => {
    // Within the PATCH request route, we allow the client
    // to make changes to an existing user in the database.
    const post = posts.find((p, i) => {
        if (p.id == req.params.id) {
            // iterating through the user object and updating each property with the data that was sent by the client
            for (const key in req.body) {
                posts[i][key] = req.body[key];
            }
            return true;
        }
    });

    if (post) res.json(post);
    else next();
});

router.delete('/:id', (req, res) => {
    // The DELETE request route simply removes a resource.
    const post = posts.find((p, i) => {
        if (p.id == req.params.id) {
            posts.splice(i, 1);
            return true;
        }
    });

    if (post) res.json(post);
    else next();
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
    // Send a success message
    //res.status(200).send({ message: 'Comment posted successfully', comment: newComment });
    // Redirect to the same page

    res.redirect(`/posts/${req.params.id}`);
});


module.exports = router;