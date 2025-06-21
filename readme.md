# 📚 Library Management API

A simple library management system built with **Node.js**, **Express**, **TypeScript**, and **MongoDB**.

Live Deployment: [https://assignment-3-library-management.vercel.app](https://assignment-3-library-management.vercel.app)

---

## 🚀 Features

- Create, retrieve, update, and delete books
- Borrow books and track borrowings
- Aggregate borrowed book summaries
- Filter, sort, and paginate books via query parameters

---

## 🧰 Tech Stack

- **Backend:** Node.js, Express
- **Database:** MongoDB, Mongoose
- **Language:** TypeScript
- **Dev Tools:** ts-node-dev, ESLint

---

## 📦 Packages Used

```
{
  "express": "^5.1.0",
  "mongoose": "^8.16.0",
  "dotenv": "^16.5.0",
  "ts-node-dev": "^2.0.0",
  "typescript": "^5.8.3",
  "@types/express": "^5.0.3"
}
```

---

## 🛠️ Installation

```bash
# 1. Clone the repository
git clone <your-repo-url>

# 2. Navigate to the project folder
cd library_management

# 3. Install dependencies
npm install

# 4. Create a .env file
touch .env
```



---

## 📜 Scripts

```bash
# Start development server
npm run dev

# Build TypeScript files
npm run build
```

---

## 📚 API Endpoints

### ➕ Create Book
`POST /api/books`

**Request Body:**
```json
{
  "title": "The psycology of money",
  "author": "Morgan Housell",
  "genre": "NON_FICTION",
  "isbn": "74",
  "description": "How money works",
  "copies": 5,
  "available": true
}
```
**Response Body:**
```json
 {
    "success": true,
    "message": "Book created successfully",
    "data": {
        "title": "The psycology of money",
        "author": "Morgan Housell",
        "genre": "NON_FICTION",
        "isbn": "74",
        "description": "How money works",
        "copies": 5,
        "available": true,
        "_id": "68565e90afc52e523f6997fd",
        "createdAt": "2025-06-21T07:26:08.487Z",
        "updatedAt": "2025-06-21T07:26:08.487Z"
    }
}

```

---

### 📖 Get All Books
`GET /api/books`

**Query Parameters:**
- `filter`: Filter by genre
- `sortBy`: Field to sort (e.g., `createdAt`)
- `sort`: asc or desc
- `limit`: Number of results (default: 10)

**Example:**  
`/api/books?filter=FANTASY&sortBy=createdAt&sort=desc&limit=5`

**Response Body:**
```json
{
    "success": true,
    "message": "Books retrieved successfully",
    "data": [
        {
            "_id": "68553a2c8226a04bc56aba50",
            "title": "The Theory of Everything",
            "author": "Stephen Hawking",
            "genre": "SCIENCE",
            "isbn": "9780553380163",
            "description": "An overview of cosmology and black holes.",
            "copies": 52,
            "available": true,
            "createdAt": "2025-06-20T10:38:36.738Z",
            "updatedAt": "2025-06-21T05:23:47.756Z"
        },
{...}
       ]
}


```
---

### 🔍 Get Book by ID
`GET /api/books/:bookId`
```json
{
    "success": true,
    "message": "Book retrieved successfully",
    "data": {
        "_id": "68565e90afc52e523f6997fd",
        "title": "The psycology of money",
        "author": "Morgan Housell",
        "genre": "NON_FICTION",
        "isbn": "74",
        "description": "How money works",
        "copies": 5,
        "available": true,
        "createdAt": "2025-06-21T07:26:08.487Z",
        "updatedAt": "2025-06-21T07:26:08.487Z"
    }
}

```
---

### ✏️ Update Book
`PUT /api/books/:bookId`

**Request Body Example:**
```json
{
  "copies": 7
}
```
**Response Body:**
```json
{
    "success": true,
    "message": "Book updated successfully",
    "data": {
        "_id": "68565e90afc52e523f6997fd",
        "title": "The psycology of money",
        "author": "Morgan Housell",
        "genre": "NON_FICTION",
        "isbn": "74",
        "description": "How money works",
        "copies": 7,
        "available": true,
        "createdAt": "2025-06-21T07:26:08.487Z",
        "updatedAt": "2025-06-21T07:33:13.023Z"
    }
}
```

---

### ❌ Delete Book
`DELETE /api/books/:bookId`
**Response Body:**
```json
{
  "success": true,
  "message": "Book deleted successfully",
  "data": null
}

```
---

### 📦 Borrow Book
`POST /api/borrow`

**Request Body:**
```json
{
  "book": "68565e90afc52e523f6997fd",
  "quantity": 6,
  "dueDate": "2025-07-18T00:00:00.000Z"
}
```
**Response Body:**
```json
{
    "success": true,
    "message": "Book borrowed successfully",
    "data": {
        "book": "68565e90afc52e523f6997fd",
        "quantity": 6,
        "dueDate": "2025-07-18T00:00:00.000Z",
        "_id": "685660f7afc52e523f699805",
        "createdAt": "2025-06-21T07:36:23.435Z",
        "updatedAt": "2025-06-21T07:36:23.435Z"
    }
}

```
---

### 📊 Get Borrow Summary (Aggregation)
`GET /api/borrow`

Returns total quantities of borrowed books with titles and ISBNs.
**Response Body:**
```json
{
    "success": true,
    "message": "Borrowed books summary retrieved successfully",
    "data": [
        {
            "totalQuantity": 4,
            "book": {
                "title": "Sapiens: A Brief History of Humankind",
                "isbn": "9780062316097"
            }
        },
	{....}
	]

```
---

## 📝 License

This project is licensed under the [ISC License](LICENSE).

---

## 👨‍💻 Author

Jahidul Islam

---

## 🌐 Deployment

Hosted on **Vercel**:  
👉 [assignment-3-library-management.vercel.app](https://assignment-3-library-management.vercel.app)

---


Feel free to contribute or raise issues!