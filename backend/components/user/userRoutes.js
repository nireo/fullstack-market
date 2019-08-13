const router = require('express').Router();
const userController = require('./userController.js');

// Public routes
router.get('/', userController.getAllUsers);
router.post('/', userController.createUser);

// Private routes
router.delete('/:id', userController.deleteUser);
router.put('/:id', userController.updateUser);

module.exports = router;
