
const express = require("express");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const path = require("path");

const app = express();
app.use(express.json());

const dbPath = path.join(__dirname, "books.db");
let db = null;

const PORT = 3002;

// Initialize database and server
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

    // Insert sample books only when the table is empty
    const result = await db.get(
      "SELECT COUNT(*) AS count FROM book;"
    );

    if (result.count === 0) {
      const books = [
        ["Python Basics", "John Smith", 250, 200],
        ["JavaScript Guide", "David Lee", 350, 300],
        ["Node.js Development", "Robert Brown", 450, 350],
        ["React for Beginners", "James Wilson", 500, 280],
        ["Database Systems", "Mary Jones", 400, 320],
        ["HTML and CSS", "Sarah Miller", 200, 180],
        ["Advanced Python", "John Smith", 600, 400],
        ["Express.js Guide", "David Lee", 550, 360],
        ["SQL Fundamentals", "Robert Brown", 300, 250],
        ["Web Development", "Mary Jones", 700, 450],
      ];

      for (const book of books) {
        await db.run(
          `INSERT INTO book (title, author, price, pages)
           VALUES (?, ?, ?, ?);`,
          book
        );
      }
    }

    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Database Error:", error.message);
    process.exit(1);
  }
};

// GET all books with search, sorting, pagination and price filters
app.get("/books/", async (request, response) => {
  try {
    const {
      search_q = "",
      order_by = "book_id",
      order = "ASC",
      limit = "10",
      offset = "0",
      min_price,
      max_price,
    } = request.query;

    const allowedColumns = [
      "book_id",
      "title",
      "author",
      "price",
      "pages",
    ];

    if (!allowedColumns.includes(order_by)) {
      return response.status(400).json({
        message: "Invalid order_by value",
      });
    }

    const sortOrder = order.toUpperCase();

    if (!["ASC", "DESC"].includes(sortOrder)) {
      return response.status(400).json({
        message: "Order must be ASC or DESC",
      });
    }

    const pageLimit = Number(limit);
    const pageOffset = Number(offset);

    if (
      !Number.isInteger(pageLimit) ||
      pageLimit < 1 ||
      !Number.isInteger(pageOffset) ||
      pageOffset < 0
    ) {
      return response.status(400).json({
        message: "Limit must be positive and offset must be non-negative",
      });
    }

    const conditions = [];
    const values = [];

    if (search_q.trim() !== "") {
      conditions.push("title LIKE ?");
      values.push(`%${search_q.trim()}%`);
    }

    if (min_price !== undefined) {
      const min = Number(min_price);

      if (!Number.isFinite(min)) {
        return response.status(400).json({
          message: "min_price must be a valid number",
        });
      }

      conditions.push("price >= ?");
      values.push(min);
    }

    if (max_price !== undefined) {
      const max = Number(max_price);

      if (!Number.isFinite(max)) {
        return response.status(400).json({
          message: "max_price must be a valid number",
        });
      }

      conditions.push("price <= ?");
      values.push(max);
    }

    if (min_price !== undefined && max_price !== undefined) {
      if (Number(min_price) > Number(max_price)) {
        return response.status(400).json({
          message: "min_price cannot be greater than max_price",
        });
      }
    }

    let query = "SELECT * FROM book";

    if (conditions.length > 0) {
      query += " WHERE " + conditions.join(" AND ");
    }

    // order_by and order are checked against allowed values
    query += ` ORDER BY ${order_by} ${sortOrder} LIMIT ? OFFSET ?;`;

    values.push(pageLimit, pageOffset);

    const books = await db.all(query, values);

    response.status(200).json(books);
  } catch (error) {
    response.status(500).json({
      message: "Failed to retrieve books",
    });
  }
});

// GET a single book
app.get("/books/:bookId/", async (request, response) => {
  try {
    const { bookId } = request.params;

    const book = await db.get(
      "SELECT * FROM book WHERE book_id = ?;",
      [bookId]
    );

    if (!book) {
      return response.status(404).json({
        message: "Book not found",
      });
    }

    response.status(200).json(book);
  } catch (error) {
    response.status(500).json({
      message: "Failed to retrieve book",
    });
  }
});

// POST a new book
app.post("/books/", async (request, response) => {
  try {
    const { title, author, price, pages } = request.body;

    if (
      typeof title !== "string" ||
      title.trim() === "" ||
      typeof author !== "string" ||
      author.trim() === "" ||
      price === undefined ||
      price === null ||
      typeof price !== "number" ||
      !Number.isFinite(price) ||
      price < 0
    ) {
      return response.status(400).json({
        message: "Title, author and a valid non-negative numeric price are required",
      });
    }

    const pageCount = pages === undefined ? 0 : pages;

    if (
      !Number.isInteger(pageCount) ||
      pageCount < 0
    ) {
      return response.status(400).json({
        message: "Pages must be a non-negative integer",
      });
    }

    const result = await db.run(
      `INSERT INTO book (title, author, price, pages)
       VALUES (?, ?, ?, ?);`,
      [title.trim(), author.trim(), price, pageCount]
    );

    response.status(201).json({
      message: "Book added successfully",
      bookId: result.lastID,
    });
  } catch (error) {
    response.status(500).json({
      message: "Failed to add book",
    });
  }
});

// PUT update a book
app.put("/books/:bookId/", async (request, response) => {
  try {
    const { bookId } = request.params;
    const { title, author, price, pages } = request.body;

    const existingBook = await db.get(
      "SELECT * FROM book WHERE book_id = ?;",
      [bookId]
    );

    if (!existingBook) {
      return response.status(404).json({
        message: "Book not found",
      });
    }

    if (
      typeof title !== "string" ||
      title.trim() === "" ||
      typeof author !== "string" ||
      author.trim() === "" ||
      typeof price !== "number" ||
      !Number.isFinite(price) ||
      price < 0 ||
      !Number.isInteger(pages) ||
      pages < 0
    ) {
      return response.status(400).json({
        message: "Valid title, author, price and pages are required",
      });
    }

    await db.run(
      `UPDATE book
       SET title = ?, author = ?, price = ?, pages = ?
       WHERE book_id = ?;`,
      [title.trim(), author.trim(), price, pages, bookId]
    );

    response.status(200).json({
      message: "Book updated successfully",
    });
  } catch (error) {
    response.status(500).json({
      message: "Failed to update book",
    });
  }
});

// DELETE a book
app.delete("/books/:bookId/", async (request, response) => {
  try {
    const { bookId } = request.params;

    const existingBook = await db.get(
      "SELECT * FROM book WHERE book_id = ?;",
      [bookId]
    );

    if (!existingBook) {
      return response.status(404).json({
        message: "Book not found",
      });
    }

    await db.run(
      "DELETE FROM book WHERE book_id = ?;",
      [bookId]
    );

    response.status(200).json({
      message: "Book deleted successfully",
    });
  } catch (error) {
    response.status(500).json({
      message: "Failed to delete book",
    });
  }
});

initializeDBAndServer();
