<div align="center">

<img src="https://raw.githubusercontent.com/ayesha-devx/cbite-auth/main/frontend/public/assets/logo.png" width="120" alt="CBite Logo" />

# CBite

### Full-Stack Authentication & Digital Platform

**Secure authentication with Email OTP, Google OAuth & GitHub OAuth**

> **"C the Idea, Bite the Market."**

<br/>

![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-Backend-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-API-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-47A248?style=for-the-badge&logo=mongodb&logoColor=white)

![Google OAuth](https://img.shields.io/badge/Google-OAuth-4285F4?style=flat-square&logo=google&logoColor=white)
![GitHub OAuth](https://img.shields.io/badge/GitHub-OAuth-181717?style=flat-square&logo=github&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-Authentication-000000?style=flat-square&logo=jsonwebtokens)
![Nodemailer](https://img.shields.io/badge/Nodemailer-Email_OTP-0F9D58?style=flat-square)

</div>

---

## About CBite

CBite is a full-stack web application combining a modern startup landing page with a complete authentication system.

The application provides multiple ways for users to securely access their account through:
- Email OTP Authentication
- Google OAuth
- GitHub OAuth
- HTTP-Only Cookie Sessions

The backend is built using a structured Node.js + Express.js architecture, with MongoDB for persistent user data and Passport.js for OAuth authentication.

---

## Key Features

### Authentication and Session Management
- 6-digit Email OTP authentication
- OTP expiration and one-time verification
- Google OAuth and GitHub OAuth integration
- Multiple authentication provider linking (email, Google, and GitHub linked to a single account)
- HTTP-only authentication cookies for session tracking
- Persistent authentication across browser refreshes
- Secure logout mechanism with cookie termination
- Authenticated user profile and session restoration
- Protected authentication endpoints

### Backend and Database
- RESTful API architecture
- Clean Controller-Service-Model separation
- MongoDB Atlas integration with Mongoose data modelling
- Passport.js OAuth strategies
- JWT-based authentication
- Custom OTP request rate limiting middleware
- Centralized Express error handling
- Environment-based configuration
- Secure email delivery using Nodemailer (Gmail SMTP)

### Frontend and Interface
- React + Vite client container
- Responsive startup landing page with dynamic UI transitions
- Dynamic login and account state rendering
- Sign-In status check upon landing page loading
- Responsive navigation links and authenticated profile views

---

## Tech Stack

| Layer | Technologies |
|---|---|
| **Frontend** | React, Vite, Tailwind CSS, Lucide React |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB Atlas, Mongoose |
| **Authentication** | JWT, Passport.js, Google OAuth, GitHub OAuth |
| **Email** | Nodemailer, Gmail SMTP |
| **Security** | Helmet, CORS, Rate Limiting, HTTP-Only Cookies |
| **Development** | Git, GitHub, Nodemon |

---

# Backend Architecture

The backend follows a layered architecture to separate HTTP handling, authentication logic, business logic, and database operations.

```text
                  CLIENT
                     │
                     ▼
              ┌─────────────┐
              │   ROUTES    │
              └──────┬──────┘
                     │
                     ▼
              ┌─────────────┐
              │ MIDDLEWARE  │
              └──────┬──────┘
                     │
                     ▼
              ┌─────────────┐
              │ CONTROLLER  │
              └──────┬──────┘
                     │
                     ▼
              ┌─────────────┐
              │  SERVICES   │
              └──────┬──────┘
                     │
          ┌──────────┼──────────┐
          ▼          ▼          ▼
       MongoDB    Email SMTP   OAuth
```

### Request Lifecycle

```text
Request
   ↓
Route
   ↓
Middleware
   ↓
Controller
   ↓
Service
   ↓
Model / External Provider
   ↓
Response
```

---

# Project Structure

```text
cbite-auth/
│
├── backend/
│   │
│   ├── src/
│   │   ├── config/
│   │   │   ├── db.js
│   │   │   ├── googlePassport.js
│   │   │   └── githubPassport.js
│   │   │
│   │   ├── controllers/
│   │   │   ├── auth.controller.js
│   │   │   └── otp.controller.js
│   │   │
│   │   ├── middleware/
│   │   │   ├── auth.middleware.js
│   │   │   ├── error.middleware.js
│   │   │   └── rateLimiter.middleware.js
│   │   │
│   │   ├── models/
│   │   │   ├── User.js
│   │   │   └── Otp.js
│   │   │
│   │   ├── routes/
│   │   │   ├── auth.routes.js
│   │   │   └── index.js
│   │   │
│   │   ├── services/
│   │   │   ├── email.service.js
│   │   │   ├── jwt.service.js
│   │   │   └── otp.service.js
│   │   │
│   │   ├── utils/
│   │   │   └── asyncHandler.js
│   │   │
│   │   ├── app.js
│   │   └── server.js
│   │
│   ├── .env.example
│   ├── .gitignore
│   └── package.json
│
├── frontend/
│   │
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   │
│   ├── package.json
│   └── vite.config.js
│
├── .gitignore
└── README.md
```

---

# Authentication Flow

## Email OTP

```text
User enters email
        │
        ▼
POST /api/auth/otp/send
        │
        ▼
Generate 6-digit OTP
        │
        ▼
Store OTP + Expiration
        │
        ▼
Send OTP via Gmail SMTP
        │
        ▼
User enters OTP
        │
        ▼
POST /api/auth/otp/verify
        │
        ▼
Validate OTP
        │
        ▼
Create / Update User
        │
        ▼
Generate JWT
        │
        ▼
HTTP-Only Cookie
        │
        ▼
   AUTHENTICATED
```

---

## Google OAuth

```text
Continue with Google
        ↓
GET /api/auth/google
        ↓
Google Authorization
        ↓
Google OAuth Callback
        ↓
Passport Strategy
        ↓
Find / Create / Link User
        ↓
Generate JWT
        ↓
Set HTTP-Only Cookie
        ↓
Redirect to CBite
        ↓
Authenticated
```

---

## GitHub OAuth

```text
Continue with GitHub
        ↓
GET /api/auth/github
        ↓
GitHub Authorization
        ↓
GitHub OAuth Callback
        ↓
Passport Strategy
        ↓
Find / Create / Link User
        ↓
Generate JWT
        ↓
Set HTTP-Only Cookie
        ↓
Redirect to CBite
        ↓
Authenticated
```

---

# Account Linking

CBite uses a unified user model for different authentication methods.

```text
                 ┌─────────────┐
                 │    USER     │
                 └──────┬──────┘
                        │
             ┌──────────┼──────────┐
             ▼          ▼          ▼
           Email      Google     GitHub
```

This allows authentication providers to be associated with an existing account when emails match, instead of creating duplicate accounts.

---

# API Endpoints

### Authentication

| Method | Endpoint | Description |
|:---:|---|---|
| `POST` | `/api/auth/otp/send` | Send Email OTP |
| `POST` | `/api/auth/otp/verify` | Verify OTP & authenticate |
| `GET` | `/api/auth/google` | Start Google OAuth |
| `GET` | `/api/auth/google/callback` | Google OAuth callback |
| `GET` | `/api/auth/github` | Start GitHub OAuth |
| `GET` | `/api/auth/github/callback` | GitHub OAuth callback |
| `GET` | `/api/auth/me` | Get authenticated user |
| `POST` | `/api/auth/logout` | Logout current user |

### System

| Method | Endpoint | Description |
|:---:|---|---|
| `GET` | `/api/health` | API & database health check |

---

# Session Management

Authentication tokens are not stored in frontend `localStorage` or `sessionStorage`.

After successful authentication:

```text
Authentication Successful
          ↓
JWT Generated
          ↓
HTTP-Only Cookie
          ↓
Browser stores cookie
          ↓
GET /api/auth/me
          ↓
Backend validates session
          ↓
Frontend receives user
          ↓
Account UI displayed
```

---

# Security

The backend implements multiple security measures:

| Security Measure | Purpose |
|---|---|
| **HTTP-Only Cookies** | Prevent direct JavaScript access to authentication token |
| **OTP Expiration** | Prevent old verification codes from being reused |
| **One-Time OTP** | Verification codes cannot be reused after validation |
| **Rate Limiting** | Restricts repeated OTP requests |
| **OAuth State Protection** | Helps protect OAuth flow against login CSRF |
| **Helmet** | Adds secure HTTP response headers |
| **CORS** | Restricts allowed frontend origins |
| **Environment Variables** | Keeps credentials outside source code |
| **Central Error Handler** | Provides consistent backend error responses |

> The real `.env` file is excluded from Git and must never be committed.

---

# Database

MongoDB stores user profiles and OTP-related authentication data.

### User Schema Model

```text
User
│
├── name
├── email
├── googleId
├── githubId
├── githubUsername
├── authProviders[]
├── isVerified
├── lastLoginAt
├── createdAt
└── updatedAt
```

### Authentication Providers
```text
authProviders: ["email", "google", "github"]
```

---

# Error Handling

The backend uses centralized Express error handling.

Asynchronous controllers use a reusable `asyncHandler` utility so rejected promises can automatically reach the global error middleware.

Example error response:

```json
{
  "success": false,
  "message": "Authentication required."
}
```

This keeps API error responses consistent and avoids repetitive controller-level error handling.

---

# Environment Setup

Create a local:

```text
backend/.env
```

Use `.env.example` as the template.

```env
PORT=5000

MONGODB_URI=your_mongodb_connection_string

JWT_SECRET=your_secure_jwt_secret

SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_google_app_password
SMTP_FROM_EMAIL=your_email@gmail.com

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=http://localhost:5000/api/auth/google/callback

GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
GITHUB_CALLBACK_URL=http://localhost:5000/api/auth/github/callback

FRONTEND_URL=http://localhost:5173
```

> Use placeholder values in `.env.example`. Never push real credentials to GitHub.

---

# Run Locally

## 1. Clone

```bash
git clone <repository-url>
cd cbite-auth
```

## 2. Start Backend

```bash
cd backend
npm install
```

Create and configure:
```text
backend/.env
```

Then:
```bash
npm run dev
```

Backend:
```text
http://localhost:5000
```

## 3. Start Frontend

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

Frontend:
```text
http://localhost:5173
```

---

# Testing the Authentication

Once both servers are running:

### Email OTP
```text
Enter Email
→ Send Verification Code
→ Check Email
→ Enter OTP
→ Verify
→ Account Created / Logged In
```

### Google
```text
Continue with Google
→ Select Google Account
→ Authorize
→ Redirect to CBite
→ Logged In
```

### GitHub
```text
Continue with GitHub
→ Authorize CBite
→ Redirect to CBite
→ Logged In
```

### Logout
```text
Account
→ Log Out Session
→ Cookie Cleared
→ Login UI Restored
```

---

# Key Concepts Demonstrated

This project demonstrates practical backend development concepts including:

`REST APIs` • `Authentication` • `OAuth 2.0` • `JWT` • `Email OTP` • `MongoDB` • `Mongoose` • `Middleware` • `Rate Limiting` • `Cookies` • `Error Handling` • `Service Layer Architecture` • `Frontend-Backend Integration`

---

<div align="center">

## Author

**Ayesha Topiwala**

Computer Engineering Student • Full-Stack Web Developer

<br/>

### CBite
**"C the Idea, Bite the Market."**

</div>
