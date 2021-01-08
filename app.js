const express = require("express");
const morgan = require("morgan");

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const quotesRouter = require('./routes/quote-routes');

const app = express();

// -------------------  STATICS FILES  -------------------
app.use(express.static(`${__dirname}/public`));
app.use("/css", express.static(`${__dirname}/public/css`));
// -----------------------------------------------------------


// -------------------  MIDDLEWARES  -------------------
app.use(morgan("dev"));

app.use(express.json());
// With this middleware i can received data from 'options'(fetch) from the browser
app.use(express.urlencoded({ extended: true }));
// -----------------------------------------------------------


// -------------------  ROUTES  -------------------
// app.get("/", (req, res) => {
//   res.sendFile(__dirname + "/public/index.html");
// });
// app.get("/add-quote", (req, res) => {
//   res.sendFile(__dirname + "/public/add-quote.html");
// });
// app.get("/modify-quote", (req, res) => {
//   res.sendFile(__dirname + "/public/modify-quote.html");
// });

app.use('/api/quotes/', quotesRouter);
// -------------------------------------------------

// ---------------  ROUTES ERROR -------------------
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on the server! (Manually created)`, 404));
});
// -------------------------------------------------

// ---------  ERROR HANDLING MIDDLEWARES ---------
app.use(globalErrorHandler);
// -----------------------------------------------

module.exports = app;