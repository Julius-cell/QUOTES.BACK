const express = require("express");
const quoteController = require("../controllers/quote-controller");
const authController = require("../controllers/authController");

const router = express.Router();

router
  .route("/")
  .get(authController.protect, quoteController.quote_all)
  .post(quoteController.add_quote);

router
  .route("/random")
  .get(quoteController.quote_random);

router
  .route("/:id").delete(
  authController.protect, 
  authController.restrictTo('admin'), 
  quoteController.delete_quote);

router
  .route("/author/:person")
  .get(quoteController.quote_byAuthor);


router
  .route("/modify/:id")
  .patch(authController.restrictTo('admin'), quoteController.patch_modify_quote);

  
module.exports = router;
