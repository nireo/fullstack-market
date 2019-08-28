const router = require('express').Router();
const userController = require('./userController.js');

// Public routes
router.get('/', userController.getAllUsers);
router.post('/', userController.createUser);

// Private routes
router.delete('/:id', userController.deleteUser);
router.put('/:id', userController.updateUser);
router.post('/buy/main', userController.buyMainItems);
router.post('/buy/community', userController.buyCommunityItems);
router.post('/bio', userController.updateBio);

module.exports = router;
