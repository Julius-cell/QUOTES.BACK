const express = require('express');
// const userController = require();
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);

// router.route('/')
//   .get(userController)
//   .post(userController);


// router.route('/:id')
//   .get(userController)
//   .patch(userController)
//   .delete(userController);

module.exports = router;