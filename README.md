# Book Review API

A RESTful API for user authentication and book reviews built using Node.js, Express, and MongoDB.

## Setup Instructions

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/Assignment
   cd Assignment
   npm install
   
2. **Create a .env file in the project root and add your environment variables (edit the values as needed):**:

```bash
MONGODB_URI=mongodb://localhost:27017/bookreviewdb
PORT=3000
```

## Running Locally

```bash
npm run dev   # Starts the server with nodemon (development mode)
npm start     # Starts the server normally (production mode)
```
By default, the API will be available at http://localhost:3000/api (replace 3000 with your configured PORT if different).


## API Endpoints
```bash
GET /api/books - Retrieve all books.
POST /api/books - Create a new book (provide JSON with title, author, description, etc.).
GET /api/books/:bookId - Retrieve a book by ID.
PUT /api/books/:bookId - Replace a book's data (all fields).
PATCH /api/books/:bookId - Update specific fields of a book.
DELETE /api/books/:bookId - Delete a book.
GET /api/books/:bookId/reviews - Retrieve all reviews for a book.
POST /api/books/:bookId/reviews - Add a review to a book (provide rating, comment, reviewer).
GET /api/books/:bookId/reviews/:reviewId - Get a specific review by ID.
DELETE /api/books/:bookId/reviews/:reviewId - Remove a review from a book.
```
Get all books:
```bash
curl -X GET http://localhost:3000/api/books
```
Create a new book:
```bash
curl -X POST http://localhost:3000/api/books \
  -H "Content-Type: application/json" \
  -d '{"title":"The Great Gatsby","author":"F. Scott Fitzgerald","description":"A novel about the American dream."}'
```
Get a book by ID:
```bash
curl -X GET http://localhost:3000/api/books/<bookId>
```
Update a book:
```bash
curl -X PUT http://localhost:3000/api/books/<bookId> \
  -H "Content-Type: application/json" \
  -d '{"title":"New Title","description":"Updated description."}'
```
Add a review to a book:
```bash
curl -X POST http://localhost:3000/api/books/<bookId>/reviews \
  -H "Content-Type: application/json" \
  -d '{"rating":5,"comment":"Excellent read!","reviewer":"Jane Doe"}'
```
Get all reviews for a book:
```bash
curl -X GET http://localhost:3000/api/books/<bookId>/reviews
```
Delete a review from a book:
```bash
curl -X DELETE http://localhost:3000/api/books/<bookId>/reviews/<reviewId>
```
Delete a book:
```bash
curl -X DELETE http://localhost:3000/api/books/<bookId>
```
## Database Schema

<img width="801" alt="Screenshot 2025-05-20 at 1 28 18 AM" src="https://github.com/user-attachments/assets/eaa0fde2-a1b0-4480-b645-d28ab6b6e205" />
<img width="868" alt="Screenshot 2025-05-20 at 1 28 22 AM" src="https://github.com/user-attachments/assets/ff416de8-0134-45d7-bc88-534bb5ca1b15" />
<img width="905" alt="Screenshot 2025-05-20 at 1 28 24 AM" src="https://github.com/user-attachments/assets/b811f330-1f76-47a8-90c2-d90ffbdada4b" />



