-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP TABLE IF EXISTS books;
DROP TABLE IF EXISTS authors;

CREATE TABLE books (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title VARCHAR(280) NOT NULL,
    released INT NOT NULL
);

INSERT INTO books (
    title,
    released
)
VALUES
    ('Lord of the Things', 1922);

CREATE TABLE authors (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR(280) NOT NULL,
    dob INT NOT NULL,
    pob VARCHAR(280) NOT NULL,
)

INSERT INTO authors (
    name,
    dob,
    pob
)
VALUES
    ('Arthur McArthur', 1959, 'Orange County');