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

exports.create_category = catchAsync(async (req, res, next) => {
  const category = await Category.create(req.body);
  res.status(201).send({
    status: "success",
    data: [category],
  });
})

exports.add_quote_to_category = catchAsync(async (req, res, next) => {
  // Array de Quotes Id's añadidos en a categoría
  const catIds = await Category.findById(req.params.id, {quotes: 1});

  if (catIds.quotes.includes(req.body.id)) {
    return next(new AppError('Esta Quote ya pertenece a esta categoría', 404));
  }

  const category = await Category.findByIdAndUpdate(req.params.id, {$push: {quotes: req.body.id}}, {
    new: true,
    useFindAndModify: false,
  });

  res.status(201).send({
    status: "success",
    data: [category],
  });
})

exports.delete_category = catchAsync(async (req, res, next) => {
  const category = await Category.findByIdAndDelete(req.params.id);

  if(!category) {
    return next(new AppError('No Category found with that ID', 404));
  };

  res.status(204).send({
    status: "success",
    data: null,
  });
})

exports.quotes_by_categoryId = catchAsync(async (req, res, next) => {
  const categories = await (await Category.findById(req.params.id, {quotes: 1}));
  res.status(200).json({
    status: "success",
    data: categories.quotes
  });
})

// -----------------------------------------------------