const express = require('express');
const router = express.Router();
const Book = require('../models/book');

router.get('/', (req, res) => {
    res.render("books/index");
});

router.get('/new', (req, res) => {
    res.render("books/new", {
        book: new Book(),
    });
});

router.post('/create-book', async (req, res) => {
    const book = new Book({
        name: req.body.name,
    })
    try {
        const newBook = await book.save()
        res.render('books');
    } catch(error) {
        res.render('books/new', {
            book: book,
            error: 'Error adding new book, try again later',
        })
    }

    // book.save()
    // .then((newBook) => {
    //     res.render('books');
    // })
    // .catch((error) => {
    //     res.render('books/new', {
    //         book: book,
    //         error: 'Error adding new book, try again later',
    //     })
    // })
});

module.exports = router;