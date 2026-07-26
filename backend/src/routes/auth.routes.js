import { Router } from 'express';
import passport from 'passport';
import { getAuthStatus, logout } from '../controllers/auth.controller.js';
import { sendOtp, verifyOtp } from '../controllers/otp.controller.js';
import { requireAuth } from '../middleware/auth.middleware.js';
import { otpRateLimiter } from '../middleware/rateLimiter.middleware.js';
import { generateToken } from '../services/jwt.service.js';

const router = Router();

// GET /api/auth/status (protected)
router.get('/status', requireAuth, getAuthStatus);

// GET /api/auth/me (protected session check alias)
router.get('/me', requireAuth, getAuthStatus);

// POST /api/auth/otp/send (rate limited)
router.post('/otp/send', otpRateLimiter, sendOtp);

// POST /api/auth/otp/verify
router.post('/otp/verify', verifyOtp);

// POST /api/auth/logout
router.post('/logout', logout);

// GET /api/auth/google (initiates OAuth consent redirect)
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'], session: false }));

// GET /api/auth/google/callback (handles Google callback, signs JWT, sets session cookie)
router.get('/google/callback',
  passport.authenticate('google', { 
    session: false, 
    failureRedirect: `${process.env.FRONTEND_URL || 'http://localhost:5173'}/login?error=oauth_failed` 
  }),
  (req, res) => {
    // Generate JWT for authenticated user profile
    const token = generateToken(req.user._id);

    // Set secure HTTP-only cookie matching OTP verify settings
    const maxAgeMs = 7 * 24 * 60 * 60 * 1000;
    res.cookie('token', token, {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      maxAge: maxAgeMs,
      path: '/'
    });

    // Redirect user to React frontend landing page / dashboard
    res.redirect(process.env.FRONTEND_URL || 'http://localhost:5173');
  }
);

// GET /api/auth/github (initiates redirect to GitHub)
router.get('/github', passport.authenticate('github', { scope: ['user:email'], session: false }));

// GET /api/auth/github/callback (handles callback exchange, signs JWT, sets session cookie)
router.get('/github/callback',
  passport.authenticate('github', { 
    session: false, 
    failureRedirect: `${process.env.FRONTEND_URL || 'http://localhost:5173'}/login?error=oauth_failed` 
  }),
  (req, res) => {
    // Generate JWT for authenticated user profile
    const token = generateToken(req.user._id);

    // Set secure HTTP-only cookie matching Google/OTP settings
    const maxAgeMs = 7 * 24 * 60 * 60 * 1000;
    res.cookie('token', token, {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      maxAge: maxAgeMs,
      path: '/'
    });

    // Redirect user to React frontend landing page / dashboard
    res.redirect(process.env.FRONTEND_URL || 'http://localhost:5173');
  }
);

export default router;
