const express = require('express');
const router = express.Router();
const Author = require('../models/author');

router.get('/', async (req, res) => {
    let searchOptions = {}
    if (req.query.name != null && req.query.name != '') {
        searchOptions.name = new RegExp(req.query.name, 'i');
    }
    try {
        const authors = await Author.find(searchOptions);
        res.render("authors/index", { 
            authors: authors, 
            searchOptions: req.query,
        });
    } catch(error) {
        res.redirect("/")
    }
})

router.get('/new', (req, res) => {
    res.render('authors/new', {
        author: new Author()
    });
})

router.post('/create-author', (req, res) => {
    const author = new Author({
        name: req.body.name,
    })
    author.save()
    .then((newAuthor) => {
        res.render('authors')
    })
    .catch((err) => {
        res.render('authors/new', {
            author: author,
            error:'Error Creating Author...',
        })
    })
})

module.exports = router;