const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    trim: true,
    maxlength: [15, 'A User name must have less or equal then 15 characters'],
    minlength: [5, 'A Tour name must have more or equal then 5 characters'],
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: [true, 'Email adress is required'],
    validate: [validator.isEmail, 'Please fill a valid email address'],
  },
  password: {
    type: String,
    required: [true, 'Password required'],
    minlength: 6,
    select: false  // With this will never be shown in any output
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password'],
    validate: {
      validator: function(el) {
        return el === this.password;
      },
      message: 'Passwords are not the same'
    }
  }
});

// PASSWORD ENCRYPTION 
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next(); 
  this.password = await bcrypt.hash(this.password, 12);

  this.passwordConfirm = undefined;   // we don't want that this persist to the DB
  next();
});

// COMPARE PASSWORDS - candidatePassword(not hashed, comming from the user)
userSchema.methods.correctPassword = async function(candidatePassword, userPassword) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model('User', userSchema);

module.exports = User;