# Lab 03: REST API, Query Parameters, Validation and Debugging

## Student Details

- **Name:** PATHA SRINIDHI
- **Registration Number:** 252U1R9121
- **Section:** CSE-GEN-AI 2B 111
- **Course:** Backend Development Fundamentals

## Objective

To develop a REST API using Node.js, Express.js and SQLite. This lab covers query parameters, searching, sorting, pagination, price filtering, input validation, HTTP status codes and debugging.

## Technologies Used

- Node.js
- Express.js
- SQLite
- JavaScript
- Postman
- VS Code

## Project Structure

```text
lab-03/
│
├── screenshots/
│   ├── 1-get-all-books.png
│   ├── 2-search-books.png
│   ├── 3-sort-books.png
│   ├── 4-pagination.png
│   ├── 5-price-filter.png
│   ├── 6-get-book.png
│   ├── 7-post-book.png
│   ├── 8-put-book.png
│   ├── 9-delete-book.png
│   ├── 10-validation-missing-title.png
│   ├── 11-validation-missing-author.png
│   ├── 12-validation-invalid-price.png
│   ├── 13-book-not-found.png
│   ├── 14-invalid-sort-order.png
│   ├── 15-invalid-price-range.png
│   ├── 16-database-records.png
│   ├── 17-port-conflict-fix.png
│   ├── 18-import-path-fix.png
│   ├── 19-table-name-fix.png
│   └── 20-missing-await-fix.png
│
├── books.db
├── package.json
├── package-lock.json
├── server.js
└── README.md
```

## Installation and Execution

1. Open the project folder in VS Code.
2. Open the terminal inside the `lab-03` folder.
3. Install dependencies:

```bash
npm install
```

4. Start the development server:

```bash
npm run dev
```

Alternatively:

```bash
npm start
```

Server URL:

```text
http://localhost:3002
```

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/books/` | Get all books |
| GET | `/books/:bookId/` | Get a book by ID |
| POST | `/books/` | Add a new book |
| PUT | `/books/:bookId/` | Update a book |
| DELETE | `/books/:bookId/` | Delete a book |

## Query Parameters

| Parameter | Description |
|---|---|
| `search_q` | Search books by title |
| `order_by` | Select the sorting column |
| `order` | Sort in ASC or DESC order |
| `limit` | Limit the number of records |
| `offset` | Skip records |
| `min_price` | Minimum book price |
| `max_price` | Maximum book price |

### Example Requests

**Search:**
```text
http://localhost:3002/books/?search_q=Python
```

**Sorting:**
```text
http://localhost:3002/books/?order_by=price&order=ASC
```

**Pagination:**
```text
http://localhost:3002/books/?limit=3&offset=0
```

**Price filtering:**
```text
http://localhost:3002/books/?min_price=300&max_price=500
```

## Screenshots

### 1. Get All Books

![Get All Books](screenshots/1-get-all-books.png)

### 2. Search Books

![Search Books](screenshots/2-search-books.png)

### 3. Sort Books

![Sort Books](screenshots/3-sort-books.png)

### 4. Pagination

![Pagination](screenshots/4-pagination.png)

### 5. Price Filtering

![Price Filtering](screenshots/5-price-filter.png)

### 6. Get Book by ID

![Get Book](screenshots/6-get-book.png)

### 7. Add a Book

![Post Book](screenshots/7-post-book.png)

### 8. Update a Book

![Update Book](screenshots/8-put-book.png)

### 9. Delete a Book

![Delete Book](screenshots/9-delete-book.png)

### 10. Validation - Missing Title

![Missing Title](screenshots/10-validation-missing-title.png)

### 11. Validation - Missing Author

![Missing Author](screenshots/11-validation-missing-author.png)

### 12. Validation - Invalid Price

![Invalid Price](screenshots/12-validation-invalid-price.png)

### 13. Book Not Found

![Book Not Found](screenshots/13-book-not-found.png)

### 14. Invalid Sort Order

![Invalid Sort Order](screenshots/14-invalid-sort-order.png)

### 15. Invalid Price Range

![Invalid Price Range](screenshots/15-invalid-price-range.png)

### 16. Database Records

![Database Records](screenshots/16-database-records.png)

### 17. Port Conflict Debugging

![Port Conflict Fix](screenshots/17-port-conflict-fix.png)

### 18. Import Path

![Import Path Fix](screenshots/18-import-path-fix.png)

### 19. Table Name

![Table Name Fix](screenshots/19-table-name-fix.png)

### 20. Missing Await

![Missing Await Fix](screenshots/20-missing-await-fix.png)

## HTTP Status Codes

| Status Code | Meaning |
|---|---|
| 200 | Request successful |
| 201 | Resource created successfully |
| 400 | Invalid input |
| 404 | Resource not found |
| 500 | Internal server error |

## Debugging and Learning Outcomes

- Learned how to resolve port conflicts.
- Understood correct module import paths.
- Learned to use consistent database table names.
- Understood the importance of `await` in asynchronous database operations.
- Implemented query parameters and validation.
- Tested REST API endpoints using Postman.
- Learned to handle errors using appropriate HTTP status codes.

## Deployment

**Deployment Status:** Not deployed yet.

The API was tested locally using Node.js and Postman.

## Conclusion

Successfully developed and tested a REST API using Node.js, Express.js and SQLite. Implemented searching, sorting, pagination, price filtering, validation and CRUD operations. Also understood debugging techniques and proper HTTP status codes.