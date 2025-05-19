# 📚 Book Review API

A RESTful API for user authentication and book reviews built using **Node.js**, **Express**, and **MongoDB**.

---

## ✨ Features

- User signup and login with **JWT authentication**
- Authenticated endpoints to:
  - Add a book review
  - Update your review
  - Delete your review
- MongoDB with **Mongoose** for data modeling
- Clean and modular codebase with environment-based configuration

---

## 🛠️ Technologies Used

- Node.js
- Express.js
- MongoDB (with Mongoose)
- JWT (JSON Web Token)
- dotenv for environment variables

---

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd <project-folder>
```
## Install Dependencies

npm install

## Create a .env File
Create a .env file in the root of the project with the following content:

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000

npm start
