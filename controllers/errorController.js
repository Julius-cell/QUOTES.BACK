const AppError = require("../utils/appError");

const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new AppError(message, 400);
};

const handleDuplicateFieldsDB = (err) => {
  const value = err.message.match(/(["'])(?:\\.|[^\\])*?\1/)[0];
  const message = `Duplicate field value: ${value}. Please use another value!`;
  return new AppError(message, 400);
};

const handleValidationErrorDB = (err) => {
  const errors = err.message;

  const message = `Invalid input data. ${errors} `;
  return new AppError(message, 400);
};

const sendError = (err, res) => {
  // All the errors wich are created by AppError class
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      error: err,
    });
    // Programming or other unknown error
  } else {
    // 1) Log Error
    console.log("ERROR !", err);
    // 2) Send generic message
    res.status(500).json({
      status: "error",
      alert: "Something went very wrong!",
      error: err,
    });
  }
};

const sendMongooseError = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  }
};


module.exports = (err, req, res, next) => {

  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  let error = { ...err };
  error.name = err.name;
  error.message = err.message;
  error.stack = err.stack.match(/[^\r\n]+/g)[1].trim();

  if (error.name === "CastError") {
    error = handleCastErrorDB(error);
    sendMongooseError(error, res);
  }
  if (error.code === 11000) {
    error = handleDuplicateFieldsDB(error);
    sendMongooseError(error, res);
  }
  if (error.name === "ValidationError") {
    error = handleValidationErrorDB(error);
    sendMongooseError(error, res);
  }

  sendError(error, res);
};
