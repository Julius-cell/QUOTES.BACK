const express = require('express');
const fs = require("fs");
const quoteController = require('../controllers/quote-controller');

const quotesRouter = express.Router();



quotesRouter.get('/', quoteController.quote_all);

quotesRouter.get('/random', quoteController.quote_random);

quotesRouter.get('/author', quoteController.quote_byAuthor);

quotesRouter.post('/newquote', quoteController.add_quote);

quotesRouter.get('/modify-quote', quoteController.get_modify_quote);

quotesRouter.put('/modify-quote', quoteController.put_modify_quote);

quotesRouter.delete('/delete', quoteController.delete_quote);



module.exports = quotesRouter;