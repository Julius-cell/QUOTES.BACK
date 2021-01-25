const express = require("express");
// const quoteController = require('../controllers/quote-controller-FS');
const quoteController = require("../controllers/quote-controller");
const authController = require('../controllers/authController');

const router = express.Router();

router
  .route("/")
  .get(authController.protect, quoteController.quote_all)
  .post(quoteController.add_quote);
// .delete(quoteController.delete_quote);

router.route("/random").get(quoteController.quote_random);


router.route("/:id")
.delete(quoteController.delete_quote)

router.route("/author/:person").get(quoteController.quote_byAuthor);

router
  .route("/modify/:id")
  .get(quoteController.get_modify_quote)
  .patch(quoteController.patch_modify_quote);

module.exports = router;
