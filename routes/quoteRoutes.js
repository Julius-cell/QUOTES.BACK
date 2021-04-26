const express = require("express");
const quoteController = require("../controllers/quote-controller");

const router = express.Router();

router
  .route("/")
  .get(quoteController.quote_all)
  .post(quoteController.add_quote);

router.route("/random").get(quoteController.quote_random);

router.route("/:categoryId").get(quoteController.allQuotesByCategory);

router.route("/:id")
  .delete(quoteController.delete_quote)

router.route("/author/:person").get(quoteController.quote_byAuthor);


router
  .route("/modify/:id")
  .get(quoteController.get_modify_quote)
  .patch(quoteController.patch_modify_quote);

module.exports = router;
