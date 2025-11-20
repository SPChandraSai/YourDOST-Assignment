# Simple To-Do CRUD API (Node.js + Express)

## 📌 Overview
This project is a **Simple To-Do CRUD API** built using **Node.js** and **Express**.  
It provides RESTful endpoints to create, read, update, and delete to-do items.

Data is stored in a **local JSON file** (`todos.json`) — no database required.

---

## 🎯 Objective
Create simple REST APIs to manage to-do items with proper status codes and JSON responses.

---

## 🚀 Features (Requirements Implemented)

### ✔ CRUD API Endpoints
| Method | Endpoint        | Description              |
|--------|------------------|--------------------------|
| GET    | `/todos`         | Get all todos            |
| POST   | `/todos`         | Create a new todo        |
| PUT    | `/todos/:id`     | Update an existing todo  |
| DELETE | `/todos/:id`     | Delete a todo by ID      |

---

### ✔ Storage Options
Data is stored in:
- **A simple local JSON file → `todos.json`**

(No database needed)

---

### ✔ Bonus Features
- **Input Validation** (title required)
- **Completed Status** (`completed: true/false`)
- Auto-generation of JSON file if missing
- Clean and consistent JSON responses
- Unique IDs created using timestamps

---

## 📁 Project Structure
```
todo-crud-api/
│── server.js
│── todos.json
│── package.json
│── package-lock.json
│── README.md
```

---

## 🛠️ Tech Stack
- Node.js
- Express.js
- File System Module (fs)

---

## ⚙️ How to Run Locally

### 1️⃣ Clone the repository  
```
git clone <your-repo-url>
cd todo-crud-api
```

### 2️⃣ Install dependencies  
```
npm install
```

### 3️⃣ Start the server  
```
npm start
```

### 4️⃣ Server will run at  
```
http://localhost:3000
```

---

## 📌 API Usage

### 🔹 1. Get All Todos  
**GET** `/todos`  

Response:
```json
{
  "success": true,
  "data": [ ... ]
}
```

🔹 2. Create a Todo

POST /todos

Body (JSON):
```json
{
  "title": "Buy milk",
  "completed": false
}
```

🔹 3. Update a Todo

PUT /todos/:id

Body (JSON):
```json
{
  "title": "Updated Task",
  "completed": true
}
```

🔹 4. Delete a Todo

DELETE /todos/:id

Response:
```json
{
  "success": true,
  "message": "Todo deleted"
}
```

---

🧪 Testing the API

You can test using:  
- Postman  
- Thunder Client (VS Code)  
- curl  
- Browser (GET only)

---

🔗 Live API Link
```
https://your-deployed-api-url.com
```

---

👨‍💻 Author

S.P. Chandra Sai  
📧 Email: s.p.chandrasai820@gmail.com  
🔗 GitHub: https://github.com/SPChandraSai