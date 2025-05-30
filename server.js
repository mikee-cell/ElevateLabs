const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

let books = [];

// GET all books
app.get('/books', (req, res) => {
    res.json(books);
});

// POST a new book
app.post('/books', (req, res) => {
    const { title, author } = req.body;
    const newBook = { id: books.length + 1, title, author };
    books.push(newBook);
    res.status(201).json(newBook);
});

// PUT update a book by ID
app.put('/books/:id', (req, res) => {
    const { id } = req.params;
    const { title, author } = req.body;
    const book = books.find(b => b.id == id);
    if (book) {
        book.title = title;
        book.author = author;
        res.json(book);
    } else {
        res.status(404).send('Book not found');
    }
});

// DELETE a book by ID
app.delete('/books/:id', (req, res) => {
    const { id } = req.params;
    books = books.filter(b => b.id != id);
    res.status(204).send();
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});