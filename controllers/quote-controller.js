const Quote = require("../models/quoteModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require('../utils/appError');


// -------------------  CONTROLLERS  -------------------
exports.quote_all = catchAsync(async (req, res, next) => {
  const quotes = await Quote.find().sort("-createdAt").select("-__v");
  res.status(200).json({
    status: "success",
    results: quotes.length,
    data: quotes,
  });
});

exports.quote_random = catchAsync(async (req, res, next) => {
  const lent = await Quote.count();
  const random = Math.floor(Math.random() * lent);
  const quote = await Quote.findOne().skip(random);

  res.status(200).json({
    status: "success",
    data: [quote],
  });
});

exports.quote_byAuthor = catchAsync(async (req, res, next) => {
  const quote = await Quote.find({ person: req.params.person });

  if(!quote) {
    return next(new AppError('No Quote found with that Author', 404));
  };

  res.status(200).json({
    status: "success",
    data: quote,
  });
});

exports.add_quote = catchAsync(async (req, res, next) => {
  const quote = await Quote.create(req.body);
  res.status(201).send({
    status: "success",
    data: [quote],
  });
});

exports.get_modify_quote = catchAsync(async (req, res, next) => {
  const quote = await Quote.findById(req.params.id);

  res.status(201).send({
    status: "success",
    data: quote,
  });
});

exports.patch_modify_quote = catchAsync(async (req, res, next) => {
  const quote = await Quote.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if(!quote) {
    return next(new AppError('No Quote found with that ID', 404));
  };

  res.status(201).send({
    status: "success",
    data: quote,
  });
});

exports.delete_quote = catchAsync(async (req, res, next) => {
  const quote = await Quote.findByIdAndDelete(req.params.id);

  if(!quote) {
    return next(new AppError('No Quote found with that ID', 404));
  };

  res.status(204).send({
    status: "success",
    data: null,
  });
});
// -----------------------------------------------------------