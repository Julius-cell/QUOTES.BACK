const fs = require("fs");
const express = require("express");
const morgan = require("morgan");

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


// DATA
const quotes = JSON.parse(fs.readFileSync(`${__dirname}/data.json`));
// -----------------------------------------------------------


// -------------------  FUNCTIONS  -------------------
const getRandomElement = (arr) => {
  if (!Array.isArray(arr)) throw new Error("Expected an array");
  return arr[Math.floor(Math.random() * arr.length)];
};
const getQuoteByAuthor = (arr, author) => {
  const quote = arr.filter((elem) => elem.person === author);
  return quote;
};
// -----------------------------------------------------------


// -------------------  ROUTES  -------------------

// app.use('/api/quotes/', quotesRouter);
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});
app.get("/add-quote", (req, res) => {
  res.sendFile(__dirname + "/public/add-quote.html");
});
app.get("/modify-quote", (req, res) => {
  res.sendFile(__dirname + "/public/modify-quote.html");
});

app.get("/api/quotes", (req, res) => {
  res.status(200).json({
    status: "success",
    results: quotes.length,
    data: {
      quotes,
    },
  });
});

app.get("/api/quotes/random", (req, res) => {
  const randomQuote = getRandomElement(quotes);
  // console.log(randomQuote);
  res.status(200).json({
    status: "success",
    data: {
      quote: [randomQuote],
    },
  });
});

app.get("/api/quotes/author", (req, res) => {
  const author = req.query.person;
  const quoteByAuthor = getQuoteByAuthor(quotes, author);
  res.status(200).json({
    status: "success",
    data: {
      quote: quoteByAuthor,
    },
  });
});

app.post("/api/quotes/newquote", (req, res) => {
  const newId = quotes[quotes.length - 1].id + 1;
  const newQuote = Object.assign({ id: newId }, req.body);
  // quotes.push(newQuote);

  fs.writeFile(`${__dirname}/data.json`, JSON.stringify(quotes), (err) => {
    res.status(201).send({
      status: "success",
      data: {
        newQuote,
      },
    });
  });
});

app.get("/api/modify-quote", (req, res) => {
  const idQuote = req.query.id;
  const modifyQuote = quotes.find((elem) => {
    if (elem.id == idQuote) return elem;
  });
  // console.log(modifyQuote);
  res.status(201).json({
    status: "success",
    data: {
      modifyQuote,
    },
  });
});

app.put("/api/modify-quote", (req, res) => {
  const modifiedElem = req.body;
  const id = parseInt(modifiedElem.id);
  modifiedElem.id = id;

  quotes.splice(id, 1, modifiedElem);
  // console.log(quotes);
  fs.writeFile(`${__dirname}/data.json`, JSON.stringify(quotes), (err) => {
    res.status(201).json({
      status: "success",
      data: {
        modifiedElem,
      },
    });
  });
});

app.delete("/api/quotes/delete", (req, res) => {
  const quotesUpdate = [];
  const id = req.query.id;
  quotes.map((elem) => {
    if (elem.id !== parseInt(id)) {
      quotesUpdate.push(elem);
    }
    return quotesUpdate;
  });
  // console.log(quotesUpdate);
  fs.writeFile(
    `${__dirname}/data.json`,
    JSON.stringify(quotesUpdate),
    (err) => {
      res.status(201).send({
        status: "success",
        data: {
          quote: quotesUpdate,
        },
      });
    }
  );
});
// -----------------------------------------------------------


// -------------------  CONNECT TO SERVER  -------------------
app.listen(PORT, "localhost", () => {
  console.log(`Listening for requests on port ${PORT}`);
});
// -----------------------------------------------------------
