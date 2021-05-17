const express = require("express");
const categoryController = require("../controllers/categoryController");

const router = express.Router();

router.route("/")
  .get(categoryController.all)
  .post(categoryController.create_category);

router.route("/add-quote/:id")
  .patch(categoryController.add_quote_to_category);

router.route("/:id")
  .delete(categoryController.delete_category);


// Actualmente sólo esta se utiliza en el front
router.route("/quotes/:id")
  .get(categoryController.quotes_by_categoryId);


module.exports = router;
