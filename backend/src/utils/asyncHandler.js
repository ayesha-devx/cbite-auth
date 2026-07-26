/**
 * Wraps an asynchronous express route handler to automatically catch
 * and pipe errors to the global error middleware.
 */
const asyncHandler = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

export default asyncHandler;
