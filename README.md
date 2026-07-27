<div align="center">

<img src="https://raw.githubusercontent.com/ayesha-devx/cbite-auth/main/frontend/public/assets/logo.png" width="120" alt="CBite Logo" />

# CBite

### **Full-Stack Authentication & Startup Platform**

*Secure identity integration featuring Email OTP, Google OAuth 2.0 & GitHub OAuth*

---

[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=white)](#)
[![Node.js](https://img.shields.io/badge/Node.js-Backend-339933?style=flat-square&logo=node.js&logoColor=white)](#)
[![Express.js](https://img.shields.io/badge/Express.js-API-000000?style=flat-square&logo=express&logoColor=white)](#)
[![MongoDB](https://img.shields.io/badge/MongoDB-Database-47A248?style=flat-square&logo=mongodb&logoColor=white)](#)

[![Google OAuth](https://img.shields.io/badge/Google-OAuth_2.0-4285F4?style=flat-square&logo=google&logoColor=white)](#)
[![GitHub OAuth](https://img.shields.io/badge/GitHub-OAuth-181717?style=flat-square&logo=github&logoColor=white)](#)
[![JWT](https://img.shields.io/badge/JWT-Authentication-000000?style=flat-square&logo=jsonwebtokens)](#)
[![Nodemailer](https://img.shields.io/badge/Nodemailer-Email_OTP-0F9D58?style=flat-square)](#)

</div>

---

## 📌 Project Overview

**CBite** is a full-stack technology platform that transforms digital concepts into market-ready opportunities. The platform integrates a modern, responsive startup landing page with a complete authentication system.

Built using a modular **Node.js + Express.js architecture**, CBite implements persistent data modeling via MongoDB Atlas, session restoration via HTTP-Only JWT tokens, and OAuth credentials mapping via Passport.js.

---

## ⚡ Key Features

### 🔐 Authentication & Session Security
- **Email OTP**: 6-digit cryptographically generated one-time verification codes sent directly to user inboxes.
- **Expiry Rules**: OTP tokens automatically expire after 5 minutes (enforced via Mongoose TTL indexes).
- **OAuth Integrations**: Seamless sign-in redirects for Google OAuth 2.0 and GitHub OAuth.
- **Account Linking**: Dynamic provider binding (email, Google, GitHub) matching identical email profiles to prevent account duplicates.
- **Secure Sessions**: Signed JSON Web Tokens (JWT) stored in HTTP-Only, SameSite cookies to protect against XSS and CSRF attacks.
- **Instant UI Updates**: Lifted React states ensure navigational links ("Sign In" ➔ "Account") and left/right UI containers transition immediately upon logging in or out without browser refreshes.

### ⚙️ Backend Architecture
- **Layered Flow**: Clean division of concerns following the `Router` ➔ `Middleware` ➔ `Controller` ➔ `Service` ➔ `Model` design pattern.
- **Custom Rate Limiting**: Strict middleware restricting OTP requests to 1 request per minute per IP/email address to prevent spam.
- **Global Error Handling**: Centralized catch-all Express middleware mapping normalized exception payloads.
- **Secure SMTP Dispatches**: Sanitized console logging routines protecting Gmail App Passwords and cryptographic keys from printing in log files.

---

## 🛠️ Technology Stack

| Component | Technologies |
| :--- | :--- |
| **Frontend** | React 19, Vite, Tailwind CSS, Lucide React Icons |
| **Backend** | Node.js, Express.js (ES Modules) |
| **Database** | MongoDB Atlas, Mongoose ODM |
| **Authentication** | JSON Web Tokens, Passport.js |
| **Email Services** | Nodemailer, Gmail SMTP Server |
| **Security Suite** | Helmet Headers, CORS Whitelisting, HTTP-Only Cookie Parsers |

---

# 🏗️ Backend System Flow

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

### Request Pipeline

```text
HTTP Request ➔ Route Definition ➔ Middleware (Rate Limiter/Auth) ➔ Controller Handler ➔ Service Logic ➔ DB / Provider ➔ Response
```

---

# 📂 Project Structure

```text
cbite-auth/
│
├── backend/
│   ├── src/
│   │   ├── config/               # Database and strategy configurations
│   │   │   ├── db.js
│   │   │   ├── googlePassport.js
│   │   │   └── githubPassport.js
│   │   │
│   │   ├── controllers/          # HTTP request controllers
│   │   │   ├── auth.controller.js
│   │   │   └── otp.controller.js
│   │   │
│   │   ├── middleware/           # Express middleware
│   │   │   ├── auth.middleware.js
│   │   │   ├── error.middleware.js
│   │   │   └── rateLimiter.middleware.js
│   │   │
│   │   ├── models/               # Mongoose database schemas
│   │   │   ├── User.js
│   │   │   └── Otp.js
│   │   │
│   │   ├── routes/               # API route definitions
│   │   │   ├── auth.routes.js
│   │   │   └── index.js
│   │   │
│   │   ├── services/             # Business logic layer
│   │   │   ├── email.service.js
│   │   │   ├── jwt.service.js
│   │   │   └── otp.service.js
│   │   │
│   │   ├── utils/                # General helpers
│   │   │   └── asyncHandler.js
│   │   │
│   │   ├── app.js                # Express app initialization
│   │   └── server.js             # Server startup bootstrap
│   │
│   ├── .env.example
│   ├── .gitignore
│   └── package.json
│
└── frontend/
    ├── public/
    ├── src/
    │   ├── assets/
    │   ├── components/
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    │
    ├── package.json
    └── vite.config.js
```

---

# 🌐 API Reference

### Authentication Endpoints

| Method | Endpoint | Access | Description |
| :---: | :--- | :--- | :--- |
| `POST` | `/api/auth/otp/send` | Public | Generates and sends a 6-digit verification code. |
| `POST` | `/api/auth/otp/verify` | Public | Validates code and establishes HTTP-Only JWT session. |
| `GET` | `/api/auth/google` | Public | Initiates Google OAuth consent flow. |
| `GET` | `/api/auth/google/callback` | Public | Handles Google authentication callback. |
| `GET` | `/api/auth/github` | Public | Initiates GitHub OAuth consent flow (writes CSRF cookie). |
| `GET` | `/api/auth/github/callback` | Public | Handles GitHub callback and links user. |
| `GET` | `/api/auth/me` | Private | Retrieves active user session using cookies. |
| `POST` | `/api/auth/logout` | Private | Clears the session cookie. |

### System Check

| Method | Endpoint | Access | Description |
| :---: | :--- | :--- | :--- |
| `GET` | `/api/health` | Public | Returns database connection and environment status. |

---

# 🛡️ Security Features

> [!IMPORTANT]
> - **HttpOnly Cookies**: Prevents client-side scripts from reading the JWT cookie, mitigating XSS risks.
> - **CSRF State Stores**: Employs a custom Passport store utilizing cryptographical `oauth_state` cookies to validate authorization requests statelessly.
> - **Central Error Handling**: Ensures backend exception logs never print sensitive database credentials or parameters back to the client.
> - **Environment Exclusions**: Crucial project parameters are locked in local `.env` keys. Template defaults reside in `.env.example`.

---

# 🗄️ Database Schemas

### User Model
```text
User
├── name (String, optional)
├── email (String, unique, lowercase, sparse)
├── googleId (String, unique, sparse)
├── githubId (String, unique, sparse)
├── githubUsername (String, optional)
├── authProviders (Array, default: [])
├── isVerified (Boolean, default: false)
├── lastLoginAt (Date)
└── timestamps (createdAt, updatedAt)
```

---

# ⚙️ Local Development

### 1. Repository Setup
```bash
git clone <repository-url>
cd cbite-auth
```

### 2. Startup Backend
```bash
cd backend
npm install
cp .env.example .env # Update MONGODB_URI and OAuth details
npm run dev
```

### 3. Startup Frontend
```bash
cd ../frontend
npm install
npm run dev
```

---

<div align="center">

## Author

**Ayesha Topiwala**  
*Computer Engineering Student • Full-Stack Web Developer*

<br/>

### CBite
**"C the Idea, Bite the Market."**

</div>
