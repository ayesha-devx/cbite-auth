<p align="center">
  <img src="frontend/public/assets/logo.png" alt="CBite Logo" width="80" />
</p>

<h1 align="center">CBite</h1>

<p align="center"><strong>C the Idea, Bite the Market.</strong></p>

<p align="center">
CBite is a modern, full-stack authentication platform built with React and Express.js, featuring multi-provider OAuth (Google, GitHub), secure email OTP verification via the Resend API, and JWT-based session management. Designed with a responsive, premium landing page and production-grade deployment architecture.
</p>



## Live Demo

| Environment | URL |
|---|---|
| **Frontend** | [https://cbite-auth.vercel.app](https://cbite-auth.vercel.app) |
| **Backend API** | [https://cbite-auth.onrender.com](https://cbite-auth.onrender.com) |

> **Note:** The backend is hosted on Render's free tier. After periods of inactivity, the first request may take 30–60 seconds while the service cold-starts.

---

## Features

### Authentication
- **Google OAuth** — One-click sign-in via Google account
- **GitHub OAuth** — One-click sign-in via GitHub account
- **Email OTP** — Passwordless email verification with 6-digit codes
- **JWT Session Management** — Secure HTTP-only cookie-based authentication
- **Protected Routes** — Middleware-guarded API endpoints with token verification
- **Logout** — Secure session invalidation with cookie clearing

### Security
- **HMAC-SHA256 OTP Hashing** — OTPs are hashed server-side before database storage
- **Constant-Time Comparison** — OTP verification uses `crypto.timingSafeEqual` to prevent timing attacks
- **Cryptographic OTP Generation** — Uses `crypto.randomInt` for secure 6-digit code generation
- **OTP Expiration** — Configurable TTL with automatic expiry (default: 5 minutes)
- **Rate Limiting** — OTP send endpoint is rate-limited to prevent abuse
- **Helmet** — HTTP security headers enabled via Helmet middleware
- **CORS** — Configured cross-origin resource sharing for frontend-backend communication

### Email Delivery
- **Resend HTTP API** — Production email delivery via Resend's REST API
- **Branded HTML Templates** — Professional verification emails with CBite branding
- **Dev Fallback** — Console-logged OTPs when Resend API key is absent (local development)

### Frontend
- **Responsive Landing Page** — Mobile-first design with premium UI components
- **Animated Gradient Text** — Custom animated heading components
- **Multi-Section Layout** — Hero, About, What We Do, How It Works, Features, Auth, CTA, Footer
- **Tailwind CSS v4** — Utility-first styling with custom design tokens

---

## Authentication Flow

### Google OAuth
```
User clicks "Continue with Google"
  → Frontend redirects to backend /api/auth/google
    → Backend initiates Google OAuth consent screen
      → User authorizes on Google
        → Google redirects to /api/auth/google/callback
          → Backend creates/finds user in MongoDB
            → JWT generated and set as HTTP-only cookie
              → User redirected to frontend (authenticated)
```

### GitHub OAuth
```
User clicks "Continue with GitHub"
  → Frontend redirects to backend /api/auth/github
    → Backend initiates GitHub OAuth authorization
      → User authorizes on GitHub
        → GitHub redirects to /api/auth/github/callback
          → Backend creates/finds user in MongoDB
            → JWT generated and set as HTTP-only cookie
              → User redirected to frontend (authenticated)
```

### Email OTP
```
User enters email address
  → Frontend sends POST /api/auth/otp/send
    → Backend generates cryptographic 6-digit OTP
      → OTP hashed with HMAC-SHA256 and stored in MongoDB
        → Resend API delivers branded verification email
          → User enters OTP code
            → Frontend sends POST /api/auth/otp/verify
              → Backend verifies OTP via constant-time hash comparison
                → JWT generated and set as HTTP-only cookie
                  → User authenticated
```

---

## Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React 19, Vite 8, Tailwind CSS 4, Lucide React |
| **Backend** | Node.js, Express 5, Passport.js |
| **Database** | MongoDB Atlas, Mongoose 9 |
| **Authentication** | Google OAuth, GitHub OAuth, Email OTP, JWT |
| **Email Delivery** | Resend HTTP API |
| **Security** | Helmet, CORS, HMAC-SHA256, cookie-parser |
| **Frontend Hosting** | Vercel |
| **Backend Hosting** | Render |

---

## System Architecture

![System Architecture](https://mermaid.ink/img/Z3JhcGggVEIKICAgIENsaWVudFtSZWFjdCBGcm9udGVuZCBWZXJjZWxdCiAgICBBUElbRXhwcmVzcyBSRVNUIEFQSSBSZW5kZXJdCiAgICBEQltNb25nb0RCIEF0bGFzXQogICAgR29vZ2xlW0dvb2dsZSBPQXV0aF0KICAgIEdpdEh1YltHaXRIdWIgT0F1dGhdCiAgICBSZXNlbmRbUmVzZW5kIEVtYWlsIEFQSV0KICAgIENsaWVudCAtLT58QVBJIFJlcXVlc3RzIEhUVFBTK0Nvb2tpZXN8IEFQSQogICAgQVBJIC0tPnxVc2VyIGFuZCBPVFAgRGF0YXwgREIKICAgIEFQSSAtLT58T0F1dGggRmxvd3wgR29vZ2xlCiAgICBBUEkgLS0+fE9BdXRoIEZsb3d8IEdpdEh1YgogICAgQVBJIC0tPnxTZW5kIE9UUCBFbWFpbHwgUmVzZW5kCiAgICBHb29nbGUgLS0+fENhbGxiYWNrfCBBUEkKICAgIEdpdEh1YiAtLT58Q2FsbGJhY2t8IEFQSQogICAgc3R5bGUgQ2xpZW50IGZpbGw6IzI1NjNlYixzdHJva2U6IzFlNDBhZixjb2xvcjojZmZmCiAgICBzdHlsZSBBUEkgZmlsbDojMGYxNzJhLHN0cm9rZTojMzM0MTU1LGNvbG9yOiNmZmYKICAgIHN0eWxlIERCIGZpbGw6IzE2YTM0YSxzdHJva2U6IzE1ODAzZCxjb2xvcjojZmZmCiAgICBzdHlsZSBHb29nbGUgZmlsbDojZWE0MzM1LHN0cm9rZTojZGMyNjI2LGNvbG9yOiNmZmYKICAgIHN0eWxlIEdpdEh1YiBmaWxsOiMzMzMsc3Ryb2tlOiM1NTUsY29sb3I6I2ZmZgogICAgc3R5bGUgUmVzZW5kIGZpbGw6IzhiNWNmNixzdHJva2U6IzdjM2FlZCxjb2xvcjojZmZm)

---

## Project Structure

```
cbite-auth/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   ├── db.js                    # MongoDB connection setup
│   │   │   ├── googlePassport.js        # Google OAuth strategy
│   │   │   └── githubPassport.js        # GitHub OAuth strategy
│   │   ├── controllers/
│   │   │   ├── auth.controller.js       # Auth status & logout handlers
│   │   │   └── otp.controller.js        # OTP send & verify handlers
│   │   ├── middleware/
│   │   │   ├── auth.middleware.js        # JWT verification middleware
│   │   │   ├── error.middleware.js       # Global error handler
│   │   │   └── rateLimiter.middleware.js # OTP rate limiting
│   │   ├── models/
│   │   │   ├── User.js                  # User schema (email, name, provider)
│   │   │   └── Otp.js                   # OTP schema (hash, expiry, email)
│   │   ├── routes/
│   │   │   ├── index.js                 # Route aggregator
│   │   │   └── auth.routes.js           # All authentication endpoints
│   │   ├── services/
│   │   │   ├── email.service.js         # Resend API email delivery
│   │   │   ├── jwt.service.js           # JWT generation & verification
│   │   │   └── otp.service.js           # OTP generation, hashing & comparison
│   │   ├── utils/
│   │   │   └── asyncHandler.js          # Async error wrapper utility
│   │   ├── app.js                       # Express app configuration
│   │   └── server.js                    # Server entry point & startup
│   ├── .env.example                     # Environment variable template
│   ├── package.json
│   └── .gitignore
│
├── frontend/
│   ├── public/                          # Static assets
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx               # Navigation bar
│   │   │   ├── Hero.jsx                 # Hero section with animated text
│   │   │   ├── About.jsx                # About section
│   │   │   ├── WhatWeDo.jsx             # Services section
│   │   │   ├── HowItWorks.jsx           # Process steps section
│   │   │   ├── Features.jsx             # Features showcase
│   │   │   ├── AuthSection.jsx          # Authentication UI (OAuth + OTP)
│   │   │   ├── CTA.jsx                  # Call-to-action section
│   │   │   ├── Footer.jsx               # Footer
│   │   │   └── ui/
│   │   │       └── AnimatedGradientText.jsx  # Animated gradient text component
│   │   ├── config/
│   │   │   └── api.js                   # API base URL configuration
│   │   ├── App.jsx                      # Root application component
│   │   ├── main.jsx                     # React entry point
│   │   └── index.css                    # Global styles & Tailwind config
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

---

## API Endpoints

### Authentication Routes (`/api/auth`)

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `GET` | `/api/auth/google` | Initiate Google OAuth flow | No |
| `GET` | `/api/auth/google/callback` | Google OAuth callback handler | No |
| `GET` | `/api/auth/github` | Initiate GitHub OAuth flow | No |
| `GET` | `/api/auth/github/callback` | GitHub OAuth callback handler | No |
| `POST` | `/api/auth/otp/send` | Send OTP to email address (rate limited) | No |
| `POST` | `/api/auth/otp/verify` | Verify OTP code and authenticate | No |
| `GET` | `/api/auth/me` | Get current authenticated user | Yes |
| `GET` | `/api/auth/status` | Get authentication status | Yes |
| `POST` | `/api/auth/logout` | Clear session and logout | No |

---

## Environment Variables

Create a `.env` file in the `backend/` directory using `.env.example` as a template:

```env
# Server
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173

# Database
MONGODB_URI=your_mongodb_atlas_connection_string

# JWT
JWT_SECRET=your_secure_random_jwt_secret
JWT_EXPIRY=7d

# OTP
OTP_HASH_SECRET=your_secure_otp_hashing_secret
OTP_EXPIRY_MINUTES=5

# Email (Resend)
RESEND_API_KEY=your_resend_api_key

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=http://localhost:5000/api/auth/google/callback

# GitHub OAuth
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
GITHUB_CALLBACK_URL=http://localhost:5000/api/auth/github/callback
```

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18+
- [MongoDB Atlas](https://www.mongodb.com/atlas) account
- [Google Cloud Console](https://console.cloud.google.com/) OAuth credentials
- [GitHub Developer Settings](https://github.com/settings/developers) OAuth App
- [Resend](https://resend.com/) API key

### Installation

```bash
# Clone the repository
git clone https://github.com/ayesha-devx/cbite-auth.git
cd cbite-auth

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### Running Locally

**Backend** (from `backend/`):
```bash
npm run dev
```
Server starts on `http://localhost:5000`

**Frontend** (from `frontend/`):
```bash
npm run dev
```
App starts on `http://localhost:5173`

---

## Deployment

### Frontend — Vercel

1. Import the repository on [Vercel](https://vercel.com/)
2. Set **Root Directory** to `frontend`
3. Build command: `npm run build`
4. Output directory: `dist`

### Backend — Render

1. Create a new **Web Service** on [Render](https://render.com/)
2. Set **Root Directory** to `backend`
3. Build command: `npm install`
4. Start command: `npm start`
5. Add all environment variables from `.env.example` with production values

> **Important:** For production, update the OAuth callback URLs to use your Render backend URL instead of `localhost`.

---

## Author

**Ayesha** — [@ayesha-devx](https://github.com/ayesha-devx)

---

<p align="center">
  <sub>Built with precision. Designed to impress.</sub><br/>
  <strong>© 2026 CBite Pvt. Ltd.</strong>
</p>
