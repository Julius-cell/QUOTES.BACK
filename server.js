const express = require("express");
const morgan = require("morgan");
const quotesRouter = require('./routes/quote-routes');

const app = express();
const PORT = process.env.PORT || 4000;



// -------------------  STATICS FILES  -------------------
app.use(express.static("public"));
app.use("/css", express.static(__dirname + "public/css"));
// -----------------------------------------------------------


// -------------------  MIDDLEWARES  -------------------
app.use(morgan("dev"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// -----------------------------------------------------------


// -------------------  ROUTES  -------------------
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});
app.get("/add-quote", (req, res) => {
  res.sendFile(__dirname + "/public/add-quote.html");
});
app.get("/modify-quote", (req, res) => {
  res.sendFile(__dirname + "/public/modify-quote.html");
});

app.use('/api/quotes/', quotesRouter);

// -----------------------------------------------------------



// -------------------  CONNECT TO SERVER  -------------------
app.listen(PORT, "localhost", () => {
  console.log(`Listening for requests on port ${PORT}`);
});
// -----------------------------------------------------------
