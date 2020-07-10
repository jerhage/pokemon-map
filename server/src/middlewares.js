const notFound = (req, res, next) => {
  const error = new Error(
    `Not Found - '${req.originalUrl}' is not the route you're looking for.`
  );
  res.status(404);
  next(error);
};

const errorHandler = (error, req, res, next) => {
  // Check if statuscode is still 200; If so, some other route had an error and came here
  // Otherwise, we will just use the giving status code
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: error.message,
    stack:
      process.env.NODE_ENV === 'production'
        ? 'No stack in production'
        : error.stack,
  });
};

module.exports = {
  notFound,
  errorHandler,
};
