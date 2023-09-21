const router = require('express').Router();
// -------- Declare our booksController
const booksController = require('../controllers/booksController')
const verify  = require('../middleware/jwtMiddleware').verify;


// -------- Route for Get all books and Add new book
router.route('/')
    .get(verify,booksController.getBooks)
    .post(verify,booksController.addBook)


// -------- Route for Get book by id, Delete book by id and Edit book by id
router.route('/:bookid/')
    .get(verify,booksController.getBookById)
    .put(verify,booksController.uploadBookCover)
    .delete(verify,booksController.deleteBookById)


router.route('/cover/:bookid/')
    .post(verify,booksController.uploadBookCover)

module.exports = router;