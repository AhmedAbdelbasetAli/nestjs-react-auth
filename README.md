# 🔐 NestJS + React Authentication App

A full-stack authentication application built with:
- 🧠 **NestJS** (TypeScript) – JWT, MongoDB, Swagger
- 💻 **React** (Vite + TypeScript) 
- 🛡️ Form validation matching task requirements
- 📦 Proper folder structure & linting


---

## ✅ Features Implemented

| Feature | Description |
|--------|-------------|
| ✅ User sign-up | With email, name, password validation |
| ✅ User login | Returns JWT token if valid |
| ✅ Token-based logout | Mocked via localStorage |
| ✅ Protected route `/app` | Only accessible after login |
| ✅ Responsive design | Works on mobile and desktop |
| ✅ Global error handling | In backend using filters |
| ✅ Structured logging | Using Winston logger |
| ✅ Rate limiting | For `/auth` routes |


---

## 🚀 Getting Started

### Prerequisites

- Node.js v18.x or higher
- npm or yarn
- MongoDB account (Atlas recommended)

---

### 1. Clone the Repository

```bash
git clone https://github.com/AhmedAbdelbasetAli/nestjs-react-auth.git 
cd nestjs-react-auth

### 2.Setup Backend
cd backend
npm install
cp .env.example .env
npm run start:dev
Backend runs at:
👉 http://localhost:3000

Swagger UI:
👉 http://localhost:3000/api

### 3.Setup Frontend
cd ../frontend
npm install
npm run dev

Frontend runs at:
👉 http://localhost:5173

🧪 Testing
Backend Tests
cd backend
npm run test
npm run test:e2e
