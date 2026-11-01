# Lab 02: SQLite Database and CRUD Routes

## Student Details
- **Name:** Patha Srinidhi
- **Registration Number:** 252U1R9121
- **Section:** CSE GEN-AI (111, 2B)

## Objective
To create a SQLite database and implement CRUD operations using Node.js, Express.js and SQLite.

## Technologies Used
- Node.js
- Express.js
- SQLite
- sqlite3
- JavaScript
- Nodemon
- Postman

## Installation and Execution

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

3. Server URL:

```text
http://localhost:3001
```

## Database Structure

Table: `book`

| Column | Data Type |
|---|---|
| book_id | INTEGER PRIMARY KEY |
| title | TEXT |
| author | TEXT |
| price | REAL |
| pages | INTEGER |

10 book records are stored in the database.

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/books/` | Get all books |
| GET | `/books/:bookId/` | Get a book by ID |
| POST | `/books/` | Add a new book |
| PUT | `/books/:bookId/` | Update a book |
| DELETE | `/books/:bookId/` | Delete a book |

## Screenshots

### 1. Get All Books
![Get All Books](screenshots/1-get-all-books.png)

### 2. Get One Book
![Get One Book](screenshots/2-get-book.png)

### 3. Add a Book
![Add a Book](screenshots/3-post-books.png)

### 4. Update a Book
![Update a Book](screenshots/4-put-book.png)

### 5. Delete a Book
![Delete a Book](screenshots/5-delete-book.png)

### 6. SQLite Database
![SQLite Database](screenshots/6-sqlite-database.png)

## SQL Injection Prevention

Parameterized queries using `?` placeholders are used to safely pass user input into SQL queries.

## Conclusion

Successfully created a SQLite database and implemented all five CRUD API endpoints using Node.js and Express.js. Tested the endpoints using Postman.