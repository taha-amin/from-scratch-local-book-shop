const { Router } = require('express');
const { Author } = require('../models/Author');

module.exports = Router()
  .get('/', async (req, res) => {
    const author = await Author.getAll();
    res.send(author);
  })

  .get('/:id', async (req, res) => {
    const id = req.params.id;
    const matchingAuthor = await Author.getById(id);
    res.json(matchingAuthor);
  });
