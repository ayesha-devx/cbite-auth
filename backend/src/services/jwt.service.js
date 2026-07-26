import jwt from 'jsonwebtoken';

/**
 * Signs a JWT containing only the user's MongoDB ID.
 * @param {string} userId - MongoDB ID of the authenticated user
 * @returns {string} - Signed JWT token string
 */
export const generateToken = (userId) => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error('JWT_SECRET is missing from the environment variables.');
  }
  const expiresIn = process.env.JWT_EXPIRY || '7d';
  return jwt.sign({ userId }, secret, { expiresIn });
};

/**
 * Verifies a JWT token signature and expiration.
 * @param {string} token - JWT token string to verify
 * @returns {object} - Decoded token payload
 */
export const verifyToken = (token) => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error('JWT_SECRET is missing from the environment variables.');
  }
  return jwt.verify(token, secret);
};
