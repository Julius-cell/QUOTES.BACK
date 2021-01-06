const Quote = require("../models/quoteModel");


// -------------------  CONTROLLERS  -------------------
exports.quote_all = async (req, res) => {
  try {

    const quotes = await Quote.find().sort('-createdAt').select('-__v');

    res.status(200).json({
      status: "success",
      results: quotes.length,
      data: {
        quotes,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: "Invalid data for getting all!",
    });
  }
};

exports.quote_random = async (req, res) => {
  try {
    const lent = await Quote.count();
    const random = Math.floor(Math.random() * lent);    
    const quote = await Quote.findOne().skip(random);

    res.status(200).json({
      status: "success",
      data: {
        quote,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: "Invalid data for get random!",
    });
  }
};

exports.quote_byAuthor = async (req, res) => {
  const quote = await Quote.findOne({ person: req.params.person });

  try {
    res.status(200).json({
      status: "success",
      data: {
        quote,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: "Invalid data for getting by author!",
    });
  }
};

exports.add_quote = async (req, res) => {
  try {
    const newQuote = await Quote.create(req.body);

    res.status(201).send({
      status: "success",
      data: {
        newQuote,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

exports.get_modify_quote = async (req, res) => {
  const quote = await Quote.findById(req.params.id);

  try {
    res.status(201).send({
      status: "success",
      data: {
        quote,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: "Invalid data sent for modifying!",
    });
  }
};

exports.patch_modify_quote = async (req, res) => {
  // console.log(req.body);
  const quote = await Quote
    .findByIdAndUpdate(req.params.id , req.body, {
      new: true,
      runValidators: true
    });

  try {

    res.status(201).send({
      status: "success",
      data: {
        quote,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: "Invalid data sent for modifying!",
    });
  }
};

exports.delete_quote = async (req, res) => {
  try {
    await Quote.findByIdAndDelete(req.params.id);

    res.status(204).send({
      status: "success",
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: "Invalid data for deleting!",
    });
  }
};
// -----------------------------------------------------------
