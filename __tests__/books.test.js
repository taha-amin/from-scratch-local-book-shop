const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('books routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('should return a list of books', async () => {
    const res = await request(app).get('/books');
    expect(res.body.length).toEqual(1);
  });

  it('should return book detail', async () => {
    const res = await request(app).get('/books/1');
    const bookOne = [{ id: '1', title: 'Lord of the Things', released: 1922 }];
    expect(res.body).toEqual(bookOne);
  });

  afterAll(() => {
    pool.end();
  });
});
