import User from '../models/User.js';
import { verifyToken } from '../services/jwt.service.js';
import asyncHandler from '../utils/asyncHandler.js';

/**
 * Middleware to protect routes that require user authorization.
 * Inspects HTTP-Only cookies, verifies the JWT signature/expiry, and attaches user records.
 */
export const requireAuth = asyncHandler(async (req, res, next) => {
  const token = req.cookies?.token;

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Access denied. No session token provided.'
    });
  }

  try {
    const decoded = verifyToken(token);
    
    if (!decoded || !decoded.userId) {
      return res.status(401).json({
        success: false,
        message: 'Access denied. Invalid session token payload.'
      });
    }

    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Access denied. User session is invalid.'
      });
    }

    // Attach user record to the request context
    req.user = user;
    next();
  } catch (error) {
    // Handle expired and malformed tokens cleanly without crashing node process
    const isExpired = error.name === 'TokenExpiredError';
    const message = isExpired 
      ? 'Session token has expired. Please authenticate again.' 
      : 'Access denied. Invalid or malformed session token.';

    return res.status(401).json({
      success: false,
      message
    });
  }
});
