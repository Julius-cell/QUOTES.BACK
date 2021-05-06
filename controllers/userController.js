const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');


const filterObj = (obj, ...allowedFields) => {
  const newObjt = {};
  Object.keys(obj).forEach(el => {
    if (allowedFields.includes(el)) newObjt[el] = obj[el]
  })
  return newObjt;
}


// ---------  FUNCTIONS ---------
exports.getAllUsers = catchAsync(async (req, res) => {
  const users = await User.find();

  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    results: users.length,
    data: {
      users,
    },
  });
});

exports.updateMe = catchAsync(async (req, res, next) => {
  // 1) Create error if user POSTS password data
  if (req.body.password || req.body.passwordConfirm) {
    return next(new AppError('This route is not for password update, please use /updatePassword for that', 400));
  }
  // 2) Filtered out unwanted fields names that are not allowed to be updated 
  const filterBody = filterObj(req.body, 'name', 'email');
  // 3) Update user document 
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filterBody, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser
    }
  })
});

exports.getUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!'
  })
};

exports.createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!'
  })
};

exports.updateUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!'
  })
};

exports.deleteUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!'
  })
};
// ------------------------------