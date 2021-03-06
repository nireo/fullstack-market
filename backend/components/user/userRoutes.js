const router = require('express').Router();
const userController = require('./userController.js');

// Public routes
router.get('/', userController.getAllUsers);
router.get('/:username', userController.getUserByUsername);
router.post('/', userController.createUser);
router.get('/search/:term', userController.searchForUser);

// Private routes
router.delete('/:id', userController.deleteUser);
router.put('/:id', userController.updateUser);
router.post('/buy/main', userController.buyMainItems);
router.post('/buy/community', userController.buyCommunityItems);
router.post('/wishlist', userController.addItemToWishlist);
router.delete('/wishlist', userController.removeItemFromWishlist);
router.put('/personal', userController.updatePersonalShop);

module.exports = router;
