import Otp from '../models/Otp.js';
import User from '../models/User.js';
import { generateSecureOtp, hashOtp, verifyOtpHash } from '../services/otp.service.js';
import { sendOtpEmail } from '../services/email.service.js';
import { generateToken } from '../services/jwt.service.js';
import asyncHandler from '../utils/asyncHandler.js';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const otpRegex = /^\d{6}$/;

/**
 * POST /api/auth/otp/send
 * Normalizes email, generates secure code, hashes it, stores in DB, and dispatches email.
 */
export const sendOtp = asyncHandler(async (req, res) => {
  const { email } = req.body;

  if (!email || typeof email !== 'string') {
    return res.status(400).json({
      success: false,
      message: 'Email address is required.'
    });
  }

  // Normalize email (lowercase and trimmed)
  const normalizedEmail = email.trim().toLowerCase();

  // Validate format
  if (!emailRegex.test(normalizedEmail)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid email address format.'
    });
  }

  // Generate 6-digit secure code
  const code = generateSecureOtp();

  // Compute HMAC hash
  const codeHash = hashOtp(code);

  // Compute expiry timestamp
  const expiryMinutes = parseInt(process.env.OTP_EXPIRY_MINUTES || '5', 10);
  const expiresAt = new Date(Date.now() + expiryMinutes * 60 * 1000);

  // Clean up any existing OTPs for this email to keep DB tidy
  await Otp.deleteMany({ email: normalizedEmail });

  // Store hashed entry in MongoDB
  await Otp.create({
    email: normalizedEmail,
    codeHash,
    expiresAt
  });

  // Dispatch email
  await sendOtpEmail(normalizedEmail, code);

  res.status(200).json({
    success: true,
    message: 'Verification code sent successfully.'
  });
});

/**
 * POST /api/auth/otp/verify
 * Validates 6-digit code format, checks hash, consumes the OTP, and logs in or registers the User.
 */
export const verifyOtp = asyncHandler(async (req, res) => {
  const { email, code } = req.body;

  if (!email || typeof email !== 'string') {
    return res.status(400).json({
      success: false,
      message: 'Email address is required.'
    });
  }

  if (!code || typeof code !== 'string') {
    return res.status(400).json({
      success: false,
      message: 'Verification code is required.'
    });
  }

  // Normalize email
  const normalizedEmail = email.trim().toLowerCase();
  const rawCode = code.trim();

  // Verify input code format (exactly 6 numeric digits)
  if (!otpRegex.test(rawCode)) {
    return res.status(400).json({
      success: false,
      message: 'Verification code must be exactly 6 numeric digits.'
    });
  }

  // Retrieve the latest active OTP for this email
  const otpRecord = await Otp.findOne({
    email: normalizedEmail,
    expiresAt: { $gt: new Date() }
  }).sort({ createdAt: -1 });

  if (!otpRecord) {
    return res.status(400).json({
      success: false,
      message: 'Invalid or expired verification code.'
    });
  }

  // Perform secure timing-safe signature check
  const isMatch = verifyOtpHash(rawCode, otpRecord.codeHash);
  if (!isMatch) {
    return res.status(400).json({
      success: false,
      message: 'Invalid or expired verification code.'
    });
  }

  // Successful verification: consume OTP immediately to prevent replay attacks
  await Otp.deleteMany({ email: normalizedEmail });

  // Find or instantiate User document
  let user = await User.findOne({ email: normalizedEmail });

  if (!user) {
    // Register new user
    user = new User({
      email: normalizedEmail,
      isVerified: true,
      lastLoginAt: new Date(),
      authProviders: ['email']
    });
  } else {
    // Update existing user properties
    user.isVerified = true;
    user.lastLoginAt = new Date();
    
    // Add "email" provider securely avoiding duplicates
    if (!user.authProviders.includes('email')) {
      user.authProviders.push('email');
    }
  }

  await user.save();

  // Generate session token (JWT)
  const token = generateToken(user._id);

  // Set secure HTTP-only cookie (7 days matching token lifespan)
  const maxAgeMs = 7 * 24 * 60 * 60 * 1000;
  res.cookie('token', token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: maxAgeMs,
    path: '/'
  });

  // Return formatted safe user response payload (excluding internal parameters and the JWT)
  res.status(200).json({
    success: true,
    message: 'Authentication successful.',
    data: {
      user: {
        id: user._id,
        email: user.email,
        name: user.name || null,
        authProviders: user.authProviders,
        isVerified: user.isVerified,
        lastLoginAt: user.lastLoginAt
      }
    }
  });
});
