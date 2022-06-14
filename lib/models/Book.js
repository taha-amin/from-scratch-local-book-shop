const pool = require('../utils/pool');
const { Author } = require('./Author');

class Book {
  id;
  title;
  released;
  authors;

  constructor(row) {
    this.id = row.id;
    this.title = row.title;
    this.released = row.released;
    this.authors = row.authors && row.authors;
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT * FROM books');
    return rows;
  }

  static async getById(id) {
    const { rows } = await pool.query(
      `SELECT
        books.*,
        COALESCE(
            json_agg(to_jsonb(authors))
            FILTER (WHERE authors.id IS NOT NULL), '[]'
        ) as authors from books
        LEFT JOIN books_authors on books.id = books_authors.books_id
        LEFT JOIN authors on books_authors.authors_id = authors.id
        WHERE books.id = $1
        GROUP BY books.id`,
      [id]
    );

    return new Book(rows[0]);
  }

  static async insert({ name }) {
    const { rows } = await pool.query(
      'INSERT INTO books (name) VALUES ($1) RETURNING *',
      [name]
    );
    return new Book(rows[0]);
  }
}

module.exports = { Book };
