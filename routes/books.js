const router = require('express').Router();
// -------- Declare our booksController
const verify  = require('../middleware/jwtMiddleware').verify;


// -------- Route for Get all books and Add new book



// -------- Route for Get book by id, Delete book by id and Edit book by id



router.route('/cover/:bookid/')
    .post(verify,booksController.uploadBookCover)

module.exports = router;