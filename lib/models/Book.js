const pool = require('../utils/pool');
// const { Author } = require('./Author');

class Book {
  id;
  title;
  released;

  constructor(row) {
    this.id = row.id;
    this.title = row.title;
    this.released = row.released;
    // this.authors =
    //   row.authors.length > 0
    //     ? row.authors.map((author) => new Author(author))
    //     : [];
  }

  static async getAll() {
    // const { rows } = await pool.query(
    //   `SELECT
    //     books.*
    //     COALESCE(
    //         json_agg(to_jsonb(authors))
    //         FILTER (WHERE authors.id IS NOT NULL), '[]'
    //     ) as authors from books
    //     LEFT JOIN authors on books.id = authors.id
    //     GROUP BY books.id`
    // );

    // return rows.map((row) => new Book(row));

    const { rows } = await pool.query(`SELECT * FROM books`);
    return rows;
  }
}

module.exports = { Book };
