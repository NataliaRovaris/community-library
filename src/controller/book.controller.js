import bookService from "../services/book.services.js";

async function createBookController(req, res) {
    const newBook = req.body;
    const userId = req.userId;

    try {
        const createdBook = await bookService.createBookService(newBook, userId);
        res.status(201).send(createdBook);
    } catch (err) {
        res.status(400).send(err.message);
    }
}

async function findAllBooksController(req, res) {
    try {
        const books = await bookService.findAllBooksService();
        res.send(books);
    } catch (err) {
        res.status(404).send(err.message);
    }
}

async function findBookByIdController(req, res) {
    try {
        const bookId = req.params.id;
        const book = await bookService.findBookByIdService(bookId);
        res.send(book)
    } catch (err) {
        res.status(404).send(err.message);
    }
}

async function updatedBookController(req, res) {
    const updatedBook = req.body;
    const bookId = req.params.id;
    const userId = req.userId;

    try {
        const response = await bookService.updateBookService(
            updatedBook,
            bookId,
            userId
        );
        return res.send(response);
    } catch (err) {
        res.status(400).send(err.message);
    }
}

async function deleteBookController(req, res) {
    const bookId = req.params.id;
    const userId = req.userId;

    try {
        const response = await bookService.deleteBookService(bookId, userId);
        res.send(response);
    } catch (err) {
        res.status(400).send(err.message);
    }
}

async function searchBooksController(req, res) {
    const {search} = req.query;
    try {
        const books = await bookService.searchBooksService(search);
        return res.send(books);
    } catch (err) {
        res.status(400).send(err.message);
    }
}

export default {
    createBookController,
    findAllBooksController,
    findBookByIdController,
    updatedBookController,
    deleteBookController,
    searchBooksController
}