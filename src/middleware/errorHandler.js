function errorHandler(err, req, res, next) {
  console.error('Error:', err.message);
  console.error('Stack:', err.stack);

  const timestamp = new Date().toISOString();
  
  // Default error response
  const errorResponse = {
    status: "error",
    message: "Internal server error",
    timestamp: timestamp
  };

  // Set appropriate status code
  let statusCode = 500;
  
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    statusCode = 400;
    errorResponse.message = "Invalid JSON in request body";
  }

  res.status(statusCode).json(errorResponse);
}

module.exports = errorHandler;