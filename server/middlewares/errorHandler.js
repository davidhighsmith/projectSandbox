const errorHandler = (error, req, res, next) => {
  if (res.statusCode === 200) res.status(500);
  res.json({
    message: error.message,
    stack: error.stack,
  });
};

module.exports = errorHandler;
