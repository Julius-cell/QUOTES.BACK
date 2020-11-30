const express = require('express');
const quoteController = require('../controllers/quote-controller');

const router = express.Router();


router.route('/')
  .get(quoteController.quote_all)
  .post(quoteController.add_quote)
  .delete(quoteController.delete_quote);

router.route('/random')
  .get(quoteController.quote_random);

router.route('/author')
  .get(quoteController.quote_byAuthor);

router.route('/modify-quote')
  .get(quoteController.get_modify_quote)
  .put(quoteController.put_modify_quote);


module.exports = router;