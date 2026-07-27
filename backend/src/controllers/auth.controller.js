import asyncHandler from '../utils/asyncHandler.js';

/**
 * GET /api/auth/status
 * Returns active user details for requests verified by requireAuth middleware.
 */
export const getAuthStatus = asyncHandler(async (req, res) => {
  res.status(200).json({
    success: true,
    authenticated: true,
    user: {
      id: req.user._id,
      email: req.user.email,
      name: req.user.name || null,
      authProviders: req.user.authProviders,
      isVerified: req.user.isVerified
    }
  });
});

/**
 * POST /api/auth/logout
 * Clears the session "token" cookie cleanly from the client.
 */
export const logout = asyncHandler(async (req, res) => {
  const isProduction = process.env.NODE_ENV === 'production';
  res.clearCookie('token', {
    httpOnly: true,
    sameSite: isProduction ? 'none' : 'lax',
    secure: isProduction,
    path: '/'
  });

  res.status(200).json({
    success: true,
    message: 'Logged out successfully.'
  });
});
