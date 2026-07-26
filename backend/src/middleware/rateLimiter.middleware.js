// In-memory data store for request tracking timestamps
const ipRequests = new Map();
const emailRequests = new Map();

// Cooldown threshold: 60 seconds (60,000 milliseconds)
const COOLDOWN_MS = 60000;

/**
 * Express middleware to rate limit OTP send requests by IP and normalized email.
 * Prevents SMTP abuse by enforcing a 1-minute delay before resending.
 */
export const otpRateLimiter = (req, res, next) => {
  const clientIp = req.ip || req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  let { email } = req.body;

  const currentTime = Date.now();

  // 1. IP rate limiting evaluation
  if (clientIp) {
    const lastIpTime = ipRequests.get(clientIp);
    if (lastIpTime && (currentTime - lastIpTime < COOLDOWN_MS)) {
      const secondsLeft = Math.ceil((COOLDOWN_MS - (currentTime - lastIpTime)) / 1000);
      return res.status(429).json({
        success: false,
        message: `Too many verification requests. Please try again in ${secondsLeft} seconds.`
      });
    }
  }

  // 2. Normalized email rate limiting evaluation
  if (email && typeof email === 'string') {
    const normalizedEmail = email.trim().toLowerCase();
    const lastEmailTime = emailRequests.get(normalizedEmail);
    if (lastEmailTime && (currentTime - lastEmailTime < COOLDOWN_MS)) {
      const secondsLeft = Math.ceil((COOLDOWN_MS - (currentTime - lastEmailTime)) / 1000);
      return res.status(429).json({
        success: false,
        message: `Too many verification requests for this email address. Please try again in ${secondsLeft} seconds.`
      });
    }
  }

  // Save current timestamps upon successful checks
  if (clientIp) {
    ipRequests.set(clientIp, currentTime);
  }
  if (email && typeof email === 'string') {
    const normalizedEmail = email.trim().toLowerCase();
    emailRequests.set(normalizedEmail, currentTime);
  }

  next();
};
