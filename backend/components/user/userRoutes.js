const router = require('express').Router();
const userController = require('./userController.js');

// Public routes
router.get('/', userController.getAllUsers);
router.post('/', userController.createUser);

module.exports = router;
