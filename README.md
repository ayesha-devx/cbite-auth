# CBite Authentication Project — Backend Foundation (Part 2)

This repository contains the landing page, interactive authentication gateway, and API backend foundation for **CBite Pvt. Ltd.** (tagline: *"C the Idea, Bite the Market."*), built using a clean, modern, and secure technology stack.

---

## 📂 Project Folder Structure

```text
cbite-auth/
│
├── frontend/
│   ├── public/
│   │   ├── assets/       # Logo/branding assets
│   │   └── vite.svg
│   │
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx        # Sticky responsive header
│   │   │   ├── Hero.jsx          # Hero section with corporate branding & visual
│   │   │   ├── About.jsx         # Section sharing corporate core values safely
│   │   │   ├── Features.jsx      # UI description cards (Simple, Modern, Secure)
│   │   │   ├── AuthSection.jsx   # OTP & OAuth Forms with interactive states
│   │   │   ├── CTA.jsx           # Section prompting user registration
│   │   │   └── Footer.jsx        # Corporate footer
│   │   │
│   │   ├── App.jsx               # Main assembly file
│   │   ├── main.jsx              # React entry point
│   │   └── index.css             # Tailwind v4 styles
│   │
│   ├── index.html                # Document entry with Inter Google Font & metadata
│   ├── package.json              # Frontend client configuration
│   └── vite.config.js            # Tailwind v4 & Vite configurations
│
├── backend/
│   ├── src/
│   │   ├── config/               # Configuration folders (Intentionally empty for database keys later)
│   │   ├── controllers/
│   │   │   └── auth.controller.js # Authentication controller (Status confirmation)
│   │   │
│   │   ├── middleware/
│   │   │   └── error.middleware.js # Express central error middleware
│   │   │
│   │   ├── routes/
│   │   │   ├── index.js          # Central API router
│   │   │   └── auth.routes.js    # Auth routes mapping
│   │   │
│   │   ├── services/             # Helper business logic services (Intentionally empty)
│   │   ├── utils/
│   │   │   └── asyncHandler.js   # Async controller error handler helper
│   │   │
│   │   ├── app.js                # Express app middleware & routing setup
│   │   └── server.js             # HTTP server bootstrap & graceful shutdown events
│   │
│   ├── .env                      # Local server configuration variables (Ignored in git)
│   ├── .env.example              # Sample template environment configurations
│   ├── .gitignore                # Ignore node_modules, logs, and .env keys
│   └── package.json              # Backend configuration scripts & dependencies
│
└── README.md                     # Documentation (This file)
```

---

## 🛠️ Technology Stack

### Frontend
- **React** (`^19.2.7`) & **React DOM** (`^19.2.7`)
- **Vite** (`^8.1.1`) — Development bundler
- **Tailwind CSS** (`^4.3.3`) & `@tailwindcss/vite`
- **Lucide React** (`^1.27.0`) — Accessible SVG icons

### Backend
- **Node.js** & **Express.js** — JavaScript server framework (configured as ES module)
- **helmet** (`^8.0.0`) — Essential HTTP security headers
- **cors** (`^2.8.5`) — Whitelisting frontend client domain
- **morgan** (`^1.10.0`) — HTTP request Logger middleware
- **dotenv** (`^16.4.7`) — Environment configurations manager
- **nodemon** (`^3.1.9`) — Development server watcher (devDependency)

---

## 🚀 Installation & Running

### Frontend

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install packages:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
   *Frontend URL: [http://localhost:5173](http://localhost:5173)*

---

### Backend

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install packages:
   ```bash
   npm install
   ```
3. Copy the environment variables template (if `.env` is not yet created):
   ```bash
   cp .env.example .env
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```
   *Backend URL: [http://localhost:5000](http://localhost:5000)*

---

## 🧪 Verified API Endpoints

Once the backend dev server is active, verify the routing setup using these URL endpoints:

| Endpoint Method | Endpoint URI | Expected Response Status | Expected JSON Output / Behavior |
| :--- | :--- | :--- | :--- |
| **GET** | `/api/health` | `200 OK` | `{"success": true, "message": "CBite API is running", "database": "connected", "environment": "development"}` |
| **POST** | `/api/auth/otp/send` | `200 OK` | `{"success": true, "message": "Verification code sent successfully."}` (Rate limited to 1/min per IP/email) |
| **POST** | `/api/auth/otp/verify` | `200 OK` | `{"success": true, "message": "Authentication successful.", "data": { "user": { ... } }}` (Sets HTTP-Only `token` cookie) |
| **GET** | `/api/auth/status` | `200 OK` / `401 Unauthorized` | Checks cookie session validation. Returns profile details on success, `401` on absence/expiry. |
| **POST** | `/api/auth/logout` | `200 OK` | `{"success": true, "message": "Logged out successfully."}` (Clears the `token` cookie) |
| **GET** | `/api/auth/google` | `302 Found` | Redirects client browser to the Google OAuth consent authentication page. |
| **GET** | `/api/auth/google/callback` | `302 Found` | Receives authorization code, logins/links profile, sets `token` cookie, and redirects browser to frontend home. |
| **GET** | `/api/auth/github` | `302 Found` | Redirects client browser to the GitHub OAuth consent authentication page. |
| **GET** | `/api/auth/github/callback` | `302 Found` | Receives authorization code, logins/links profile, sets `token` cookie, and redirects browser to frontend home. |
| **GET** | `/api/does-not-exist` | `404 Not Found` | `{"success": false, "message": "Route not found"}` |

---

## 🗄️ Database Integration: MongoDB & Mongoose

This project connects to a MongoDB database to store authentication and user profiles. Configure the MongoDB connection string inside `backend/.env` using the key `MONGODB_URI`.

### User Schema Definition

All authentication methods (Google, Apple, Email OTP) store user attributes in a unified `User` collection. It contains the following properties:

* **name** (String, trimmed, optional)
* **email** (String, trimmed, lowercase, unique, sparse, verified structure)
* **googleId** (String, unique, sparse, optional)
* **appleId** (String, unique, sparse, optional)
* **authProviders** (Array of Strings: enum `['email', 'google', 'apple']`, default empty)
* **isVerified** (Boolean, default `false`)
* **lastLoginAt** (Date, optional)
* **timestamps** (Mongoose auto-generates `createdAt` and `updatedAt`)
