const Category = require("../models/categoryModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require('../utils/appError');

// -------------------  CONTROLLERS  -------------------
exports.all = catchAsync(async (req, res, next) => {
  const categories = await Category.find();
  res.status(200).json({
    status: "success",
    results: categories.length,
    data: categories
  });
})

exports.add_category = catchAsync(async (req, res, next) => {
  const category = await Category.create(req.body);
  res.status(201).send({
    status: "success",
    data: [category],
  });
})

exports.delete_category = catchAsync(async (req, res, next) => {
  const category = await Category.findByIdAndDelete(req.params.id);

  if(!category) {
    return next(new AppError('No Quote found with that ID', 404));
  };

  res.status(204).send({
    status: "success",
    data: null,
  });
})

// -----------------------------------------------------