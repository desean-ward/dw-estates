const errorHandler = (statusCode, message) => {
  const error = new Error();
  error.statusCode = statusCode;
  error.message = message;
  console.log("Error", error.message);
  return error;
};

module.exports = errorHandler;
