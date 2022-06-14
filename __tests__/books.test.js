const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('books routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('should return a list of books with authors detail', async () => {
    const res = await request(app).get('/books');
    expect(res.status).toBe(200);
    expect(res.body).toEqual([
      {
        id: '1',
        title: 'Lord of the Things',
        released: 1922,
      },
      {
        id: '2',
        title: 'Of Mice and Men',
        released: 1999,
      },
      {
        id: '3',
        title: 'Harry Potter',
        released: 2000,
      },
    ]);
  });

  it('should return book detail for first book', async () => {
    const res = await request(app).get('/books/1');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      id: '1',
      title: 'Lord of the Things',
      released: 1922,
      authors: [
        { id: 1, name: 'Arthur McArthur', dob: 1959, pob: 'Orange County' },
      ],
    });
  });

  it('should be able to create new book', async () => {
    const res = await request(app)
      .post('/books')
      .send({ title: 'Hugo', released: 2022 });
    expect(res.status).toBe(200);
    expect(res.body.title).toBe('Hugo');
  });

  afterAll(() => {
    pool.end();
  });
});
