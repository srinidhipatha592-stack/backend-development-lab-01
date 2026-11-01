const express = require("express");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const path = require("path");

const app = express();
app.use(express.json());

const dbPath = path.join(__dirname, "books.db");

let db = null;

// Initialize Database and Server
const initializeDBAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });

    await db.exec(`
      CREATE TABLE IF NOT EXISTS book (
        book_id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        author TEXT NOT NULL,
        price REAL NOT NULL,
        pages INTEGER NOT NULL
      );
    `);

    app.listen(3001, () => {
      console.log("Server running at http://localhost:3001");
    });
  } catch (error) {
    console.log(`DB Error: ${error.message}`);
    process.exit(1);
  }
};

// GET all books
app.get("/books/", async (request, response) => {
  const query = `SELECT * FROM book ORDER BY book_id;`;
  const books = await db.all(query);
  response.send(books);
});

// GET a specific book
app.get("/books/:bookId/", async (request, response) => {
  const { bookId } = request.params;

  const query = `SELECT * FROM book WHERE book_id = ?;`;
  const book = await db.get(query, [bookId]);

  if (book === undefined) {
    response.status(404).send("Book not found");
  } else {
    response.send(book);
  }
});

// POST a new book
app.post("/books/", async (request, response) => {
  const { title, author, price, pages } = request.body;

  if (!title || !author || price === undefined || pages === undefined) {
    response.status(400).send("All fields are required");
    return;
  }

  const query = `
    INSERT INTO book (title, author, price, pages)
    VALUES (?, ?, ?, ?);
  `;

  await db.run(query, [title, author, price, pages]);

  response.send("Book added successfully");
});

// PUT update a book
app.put("/books/:bookId/", async (request, response) => {
  const { bookId } = request.params;
  const { title, author, price, pages } = request.body;

  const existingBook = await db.get(
    `SELECT * FROM book WHERE book_id = ?;`,
    [bookId]
  );

  if (existingBook === undefined) {
    response.status(404).send("Book not found");
    return;
  }

  const query = `
    UPDATE book
    SET title = ?, author = ?, price = ?, pages = ?
    WHERE book_id = ?;
  `;

  await db.run(query, [title, author, price, pages, bookId]);

  response.send("Book updated successfully");
});

// DELETE a book
app.delete("/books/:bookId/", async (request, response) => {
  const { bookId } = request.params;

  const existingBook = await db.get(
    `SELECT * FROM book WHERE book_id = ?;`,
    [bookId]
  );

  if (existingBook === undefined) {
    response.status(404).send("Book not found");
    return;
  }

  await db.run(
    `DELETE FROM book WHERE book_id = ?;`,
    [bookId]
  );

  response.send("Book deleted successfully");
});

// Start server
initializeDBAndServer();