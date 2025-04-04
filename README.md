Here’s your formatted **Job Board Platform - Backend API** documentation with consistent spacing, formatting, and styling:

---

# Job Board Platform - Backend API

---

## Overview
This is the backend API for a Job Board Platform where:
- **Companies** can post jobs.
- **Job Seekers** can apply for jobs.
- **Admins** can manage users and jobs.

---

## Tech Stack
- **Backend:** Node.js (Express)  
- **Database:** MongoDB (Mongoose)  
- **Authentication:** JWT  
- **Real-Time:** WebSockets (Socket.io)  
- **Security:** Rate Limiting (`express-rate-limit`)  

---

## API Endpoints

### Authentication

#### POST `/api/auth/register`
**Description:** Register a new user.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "job_seeker"
}
```

**Sample Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

#### POST `/api/auth/login`
**Description:** Login an existing user.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Sample Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

### Jobs

#### POST `/api/jobs`
**Description:** Create a new job (only accessible by companies).

**Request Body:**
```json
{
  "title": "Software Engineer",
  "description": "Develop and maintain web applications.",
  "company": "Google Inc.",
  "salary": 120000
}
```

**Sample Response:**
```json
{
  "_id": "64f1c2d5e4b0a5f1a2b3c4d5",
  "title": "Software Engineer",
  "description": "Develop and maintain web applications.",
  "company": "Google Inc.",
  "salary": 120000,
  "postedBy": "64f1c2d5e4b0a5f1a2b3c4d4",
  "applicants": []
}
```

---

#### GET `/api/jobs`
**Description:** Fetch all jobs.

**Sample Response:**
```json
[
  {
    "_id": "64f1c2d5e4b0a5f1a2b3c4d5",
    "title": "Software Engineer",
    "description": "Develop and maintain web applications.",
    "company": "Google Inc.",
    "salary": 120000,
    "postedBy": {
      "_id": "64f1c2d5e4b0a5f1a2b3c4d4",
      "name": "Google Inc."
    },
    "applicants": []
  }
]
```

---

#### GET `/api/jobs/:id`
**Description:** Fetch details of a specific job.

**Sample Response:**
```json
{
  "_id": "64f1c2d5e4b0a5f1a2b3c4d5",
  "title": "Software Engineer",
  "description": "Develop and maintain web applications.",
  "company": "Google Inc.",
  "salary": 120000,
  "postedBy": "64f1c2d5e4b0a5f1a2b3c4d4",
  "applicants": ["64f1c2d5e4b0a5f1a2b3c4d6"]
}
```

---

#### POST `/api/jobs/:id/apply`
**Description:** Apply for a job (only accessible by job seekers).

**Sample Response:**
```json
{
  "message": "Application submitted"
}
```

---

## Role-Based Access Control (RBAC)
- **Admin** – Manage users and jobs.  
- **Company** – Create and manage job listings.  
- **Job Seeker** – Apply for jobs.  

---

## Real-Time Job Updates
- WebSocket events to broadcast job updates.  
- `newJob` event to notify connected clients.  

---

## Testing
Run unit and integration tests using **Jest**:
```bash
npm run test
```

**Test Coverage:**
- Authentication & Role Permissions  
- Job CRUD Operations  
- WebSocket Real-Time Updates  

---

## Seed Data
Run the seed script to add initial users and jobs:
```bash
npm run seed
```

---

## Run the Application

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Environment Variables
Create a `.env` file:
```
MONGO_URI=<Your MongoDB URI>
JWT_SECRET=<Your JWT Secret>
```

### 3. Start the Server
```bash
node server.js
```

---
