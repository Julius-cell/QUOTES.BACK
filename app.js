const express = require("express");
const cors = require('cors');
const path = require('path');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

const quoteRouter = require('./routes/quoteRoutes');
const categoryRouter = require('./routes/categoryRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();



// -------------------  MIDDLEWARES  ---------------------
// Set Security HTTP headers
app.use(helmet());
// Limit request from the same API
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many request from this IP, please try again in an hour!'
})
app.use('/api', limiter);
app.use(cors());
app.use(express.json());
// Data sanitization NoSQL query injection
app.use(mongoSanitize());
// Data sanitization against XSS
app.use(xss());
// Prevent parameter pollution (exam: more than one sort) - whitelist for exceptions
app.use(hpp());
// app.use(hpp({
  // whitelist: []
// }));
// With this middleware i can received data from 'options'(fetch) from the browser
app.use(express.urlencoded({ extended: true }));
// -------------------------------------------------------

// -------------------  STATICS FILES  -------------------
app.use(express.static('public'));
// -------------------------------------------------------

// -------------------  ROUTES  --------------------------
app.use('/api/quotes/', quoteRouter);
app.use('/api/categories/', categoryRouter);
app.use('/api/user/', userRouter);
// -------------------------------------------------------


// ---------------  ROUTES ERROR -------------------------
app.all('*', (req, res, next) => {
  res.sendFile(path.resolve(__dirname, 'public/index.html'));
  // next(new AppError(`Can't find ${req.originalUrl} on the server! (Manually created)`, 404));
});
// -------------------------------------------------------


// ---------  ERROR HANDLING MIDDLEWARES -----------------
app.use(globalErrorHandler);
// -------------------------------------------------------

module.exports = app;