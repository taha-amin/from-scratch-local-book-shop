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

  static async getById(id) {
    const { rows } = await pool.query(
      `SELECT
    authors.*,
    COALESCE(
        json_agg(to_jsonb(books))
        FILTER (WHERE books.id IS NOT NULL), '[]'
        ) AS books from authors
        LEFT JOIN books_authors on authors.id = books_authors.author_id
        LEFT JOIN books on books_authors.book_id = books.id where authors.id = $1
        GROUP BY authors.id`,
      [id]
    );
    return new Author(rows[0]);
  }

  static async insert({ title, released }) {
    const { rows } = await pool.query(
      `INSERT INTO authors (title, released)
      VALUES ($1, $2)
      RETURNING *`,
      [title, released]
    );
    return new Author(rows[0]);
  }
}

module.exports = { Author };
