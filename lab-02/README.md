# Lab 02: SQLite Database and CRUD Routes

## Student Details

- **Name:** PATHA SRINIDHI
- **Registration Number:** 252U1R9121
- **Section:** CSE-GEN-AI 2B 111
- **Course:** Backend Development Fundamentals
- **Lab Number:** 02

## Objective

To connect a SQLite database with a Node.js and Express application and implement CRUD operations using REST API routes.

## Technologies Used

- Node.js
- Express.js
- SQLite
- sqlite3
- sqlite
- Nodemon
- Postman

## Installation and Execution

1. Open the `lab-02` folder in the terminal.
2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Server URL:

   `http://localhost:3001`

## Database Structure

**Table Name:** `book`

| Column | Data Type |
|---|---|
| book_id | INTEGER PRIMARY KEY |
| title | TEXT |
| author | TEXT |
| price | REAL |
| pages | INTEGER |

10 book records are stored in the database using SQLite CLI.

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/books/` | Get all books |
| GET | `/books/:bookId/` | Get one book |
| POST | `/books/` | Add a new book |
| PUT | `/books/:bookId/` | Update a book |
| DELETE | `/books/:bookId/` | Delete a book |

## SQL Injection Prevention

Parameterized queries using `?` placeholders are used to safely pass user input into SQL queries.

## Screenshots

### Get All Books

![Get All Books](https://github.com/srinidhipatha592-stack/backend-development-lab-01/blob/main/lab-02/screenshots/1-get-all-books.png?raw=true)

### Get One Book

![Get One Book](./screenshots/2-get-book.png)

### Add a Book

![Add a Book](./screenshots/3-post-books.png)

### Update a Book

![Update a Book](./screenshots/4-put-book.png)

### Delete a Book

![Delete a Book](./screenshots/5-delete-book.png)

### SQLite Database Records

![SQLite Database](./screenshots/6-sqlite-database.png)

## Deployment

The application was tested locally using Postman.

Deployment has not yet been completed. Postman screenshots are provided as evidence of the working API endpoints.