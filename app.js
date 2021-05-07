const express = require("express");
const cors = require('cors');
const path = require('path');
const rateLimit = require('express-rate-limit');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

const quoteRouter = require('./routes/quoteRoutes');
const categoryRouter = require('./routes/categoryRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

// -------------------  STATICS FILES  -------------------
app.use(express.static('public'));
// -------------------------------------------------------


// -------------------  MIDDLEWARES  ---------------------
// app.use(morgan("dev"));
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many request from this IP, please try again in an hour!'
})
app.use('/api', limiter);
app.use(cors());
app.use(express.json());
// With this middleware i can received data from 'options'(fetch) from the browser
app.use(express.urlencoded({ extended: true }));
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