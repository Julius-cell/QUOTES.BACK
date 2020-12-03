const fs = require("fs");



// -------------------  DATA  -------------------
const pathData = `${process.cwd()}/data.json`;
console.log(pathData);
const quotes = JSON.parse(fs.readFileSync(pathData));
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



// -------------------  CONTROLLERS  -------------------
const quote_all = (req, res) => {
  res.status(200).json({
    status: "success",
    results: quotes.length,
    data: {
      quotes,
    },
  });
};

const quote_random = (req, res) => {
  const randomQuote = getRandomElement(quotes);
  res.status(200).json({
    status: "success",
    data: {
      quote: [randomQuote],
    },
  });
};

const quote_byAuthor = (req, res) => {
  const author = req.query.person;
  const quoteByAuthor = getQuoteByAuthor(quotes, author);
  res.status(200).json({
    status: "success",
    data: {
      quote: quoteByAuthor,
    },
  });
};

const add_quote = (req, res) => {
  const newId = quotes[quotes.length - 1].id + 1;
  const newQuote = Object.assign({ id: newId }, req.body);
  // console.log(newQuote);
  quotes.push(newQuote);
  fs.writeFile(pathData, JSON.stringify(quotes), (err) => {
    res.status(201).send({
      status: "success",
      data: {
        newQuote,
      },
    });
  });
};

const get_modify_quote = (req, res) => {
  const idQuote = req.query.id;
  // console.log(idQuote);
  const modifyQuote = quotes.find((elem) => {
    if (elem.id == idQuote) return elem;
  });
  res.status(201).json({
    status: "success",
    data: {
      modifyQuote,
    },
  });
};

const put_modify_quote = (req, res) => {
  const modifiedElem = req.body;
  const id = parseInt(modifiedElem.id);
  // console.log(id);
  modifiedElem.id = id;
  
  quotes.splice(id, 1, modifiedElem);
  fs.writeFile(pathData, JSON.stringify(quotes), (err) => {
    res.status(201).json({
      status: "success",
      data: {
        modifiedElem,
      },
    });
  });
};

const delete_quote = (req, res) => {
  const quotesUpdate = [];
  const id = req.query.id;
  quotes.map((elem) => {
    if (elem.id !== parseInt(id)) {
      quotesUpdate.push(elem);
    }
    return quotesUpdate;
  });
  fs.writeFile(pathData, JSON.stringify(quotesUpdate), (err) => {
    res.status(201).send({
      status: "success",
      data: {
        quote: quotesUpdate,
      },
    });
  }
  );
};
// -----------------------------------------------------------

module.exports = {
  quote_all,
  quote_random,
  quote_byAuthor,
  add_quote,
  get_modify_quote,
  put_modify_quote,
  delete_quote,
};
