const { Router } = require('express');
const { Book } = require('../models/Book');

module.exports = Router()
  .get('/', async (req, res) => {
    const books = await Book.getAll();
    res.send(books);
  })

  .get('/:id', async (req, res) => {
    const id = req.params.id;
    const matchingBook = await Book.getById(id);
    res.json(matchingBook);
  })

  .post('/', async (req, res) => {
    const { name } = req.body;
    const book = await Book.insert({ name });
    res.send(book);
  });
