/**
 * Express global error handling middleware.
 * Formats errors consistently as JSON payloads.
 */
const errorMiddleware = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  const response = {
    success: false,
    message,
  };

  // Include stack trace only in development environment
  if (process.env.NODE_ENV === 'development') {
    response.stack = err.stack;
  }

  console.error(`[API Error] ${statusCode} - ${message}`, err.stack || '');

  res.status(statusCode).json(response);
};

export default errorMiddleware;
