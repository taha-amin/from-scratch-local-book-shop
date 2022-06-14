const pool = require('../utils/pool');
const Book = require('../models/Book');

class Author {
  id;
  name;
  dob;
  pob;
  books;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.dob = row.dob;
    this.pob = row.pob;
    this.books =
      row.books.length > 0 ? row.books.map((book) => new Book(book)) : [];
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT * FROM authors');
    return rows;
  }
}

module.exports = { Author };
