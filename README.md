# DecodeLabs Internship — Project 2
## Backend API Development | Batch 2026

### 🚀 How to Run

```bash
npm install
npm start
```

Then open: **http://localhost:3000**

---

### 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/status` | Health check |
| GET | `/api/messages` | Get all messages |
| POST | `/api/messages` | Submit a message |
| GET | `/api/messages/:id` | Get one message |
| DELETE | `/api/messages/:id` | Delete a message |

---

### 📦 POST /api/messages — Request Body

```json
{
  "name": "Adnan Ali",
  "email": "adnan@example.com",
  "project": "responsive",
  "message": "I want to build a website."
}
```

### ✅ Success Response (201)

```json
{
  "success": true,
  "message": "Message received! We will reply within 24 hours.",
  "data": {
    "id": 1,
    "name": "Adnan Ali",
    "email": "adnan@example.com",
    "project": "responsive",
    "message": "I want to build a website.",
    "receivedAt": "2026-06-02T18:00:00.000Z"
  }
}
```

### ❌ Error Response (400)

```json
{
  "success": false,
  "error": "Bad Request — name, email and message are required."
}
```

---

### 🛠 Tech Stack
- **Runtime:** Node.js
- **Framework:** Express.js
- **Frontend:** HTML + CSS + JavaScript (Project 1)
- **Data:** In-memory store

---

*Built with integrity. Validate Everything. Communicate Clearly. Respect the Architecture.*
