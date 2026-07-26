import crypto from 'crypto';

/**
 * Generates a cryptographically secure 6-digit numeric OTP.
 * @returns {string} 6-digit numeric string
 */
export const generateSecureOtp = () => {
  // Generate random integer in the range [100000, 999999]
  const val = crypto.randomInt(100000, 1000000);
  return String(val);
};

/**
 * Hashes a plaintext code using HMAC-SHA256 with the server-side OTP_HASH_SECRET.
 * Throws an error if the secret is not defined.
 * @param {string} code - Plaintext OTP
 * @returns {string} - Computed hex digest
 */
export const hashOtp = (code) => {
  const secret = process.env.OTP_HASH_SECRET;
  if (!secret) {
    throw new Error('OTP_HASH_SECRET is missing from the environment variables.');
  }
  return crypto
    .createHmac('sha256', secret)
    .update(code)
    .digest('hex');
};

/**
 * Safely compares a plaintext code to a stored HMAC hash in constant time.
 * @param {string} code - Submitted plaintext code
 * @param {string} targetHash - Stored HMAC hex hash
 * @returns {boolean} - True if hashes match
 */
export const verifyOtpHash = (code, targetHash) => {
  try {
    const computedHash = hashOtp(code);
    
    const bufComputed = Buffer.from(computedHash, 'hex');
    const bufTarget = Buffer.from(targetHash, 'hex');

    // timingSafeEqual requires buffers of identical length
    if (bufComputed.length !== bufTarget.length) {
      return false;
    }

    return crypto.timingSafeEqual(bufComputed, bufTarget);
  } catch (error) {
    console.error('[Security Service Error] Secure hash comparison failed:', error.message);
    return false;
  }
};
