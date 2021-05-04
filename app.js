const express = require("express");
const cors = require('cors');
const path = require('path');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const quotesRouter = require('./routes/quoteRoutes');
const categoriesRouter = require('./routes/categoryRoutes');

const app = express();

// -------------------  STATICS FILES  -------------------
app.use(express.static('public'));
// -------------------------------------------------------


// -------------------  MIDDLEWARES  ---------------------
// app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
// With this middleware i can received data from 'options'(fetch) from the browser
app.use(express.urlencoded({ extended: true }));
// -------------------------------------------------------


// -------------------  ROUTES  --------------------------
app.use('/api/quotes/', quotesRouter);
app.use('/api/categories/', categoriesRouter);
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