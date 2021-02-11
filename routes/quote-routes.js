const express = require("express");
// const quoteController = require('../controllers/quote-controller-FS');
const quoteController = require("../controllers/quote-controller");
const authController = require('../controllers/authController');

const router = express.Router();

router
  .route("/")
  .get(authController.protect, quoteController.quote_all)
  .post(authController.protect, quoteController.add_quote);

router.route("/random").get(quoteController.quote_random);


router.route("/:id")
.delete(authController.protect, authController.restrictTo('admin'), quoteController.delete_quote)

router.route("/author/:person").get(authController.protect, quoteController.quote_byAuthor);

router
  .route("/modify/:id")
  .get(authController.protect, authController.restrictTo('admin'), quoteController.get_modify_quote)
  .patch(authController.protect, authController.restrictTo('admin'), quoteController.patch_modify_quote);

module.exports = router;
