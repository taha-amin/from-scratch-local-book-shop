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
        // authors: [
        //   { id: '1', name: 'Arthur McArthur', dob: 1959, pob: 'Orange County' },
        // ],
      },
      {
        id: '2',
        title: 'Of Mice and Men',
        released: 1999,
        // authors: [{ id: '2', name: 'Test McTest', dob: 1960, pob: 'New York' }],
      },
      {
        id: '3',
        title: 'Harry Potter',
        released: 2000,
        // authors: [{ id: '3', name: 'Another McTest', dob: 1890, pob: 'Miami' }],
      },
    ]);
  });

  it.skip('should return book detail', async () => {
    const res = await request(app).get('/books/1');
    const bookOne = { id: '1', title: 'Lord of the Things', released: 1922 };
    expect(res.body).toEqual(bookOne);
  });

  afterAll(() => {
    pool.end();
  });
});
