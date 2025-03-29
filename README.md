# Job Board Platform - Backend API

---

## Overview
This is the backend API for a Job Board Platform where:
- **Companies** can post jobs.
- **Job Seekers** can apply for jobs.
- **Admins** can manage users and jobs.

---

## ⚡Tech Stack
- **Backend:** Node.js (Express)
- **Database:** MongoDB (Mongoose)
- **Authentication:** JWT
- **Real-Time:** WebSockets (Socket.io)
- **Security:** Rate Limiting (`express-rate-limit`)

---

## API Endpoints
### Auth Routes
- `POST /api/auth/register` – Register a new user
- `POST /api/auth/login` – Login and receive JWT token

### Job Routes
- `POST /api/jobs` – Create a job (Company only)
- `GET /api/jobs` – Fetch all jobs
- `GET /api/jobs/:id` – Get job details by ID
- `POST /api/jobs/:id/apply` – Apply for a job (Job Seeker only)

---

## Role-Based Access Control (RBAC)
- `Admin` – Manage users and jobs.
- `Company` – Create and manage job listings.
- `Job Seeker` – Apply for jobs.

---

## Real-Time Job Updates
- WebSocket events to broadcast job updates.
- `newJob` event to notify connected clients.

---

## 🧪 Testing
Run unit and integration tests using **Jest**:
```bash
npm run test
```
Test Coverage:
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
### 1. **Install Dependencies**
```bash
npm install
```

### 2. **Set Environment Variables**
Create a `.env` file:
```
MONGO_URI=<Your MongoDB URI>
JWT_SECRET=<Your JWT Secret>
```

### 3. **Start the Server**
```bash
node server.js
```

---
