const express = require("express");
const categoryController = require("../controllers/categoryController");

const router = express.Router();

router.route("/")
  .get(categoryController.all)
  .post(categoryController.add_category);

router.route("/:id")
  .delete(categoryController.delete_category)


module.exports = router;
