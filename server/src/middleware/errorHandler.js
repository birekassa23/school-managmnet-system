export function errorHandler(err, req, res, next) {
  console.error('💥 Server Error:', err);

  const status = err.status || 500;
  const message = err.message || 'Internal Server Error';

  res.status(status).json({
    success: false,
    message: process.env.NODE_ENV === 'production' && status === 500 ? 'Internal server error occurred' : message,
    errors: err.errors || null,
  });
}
