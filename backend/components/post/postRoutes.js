const router = require('express').Router();
const postController = require('./postController');

// Public routes
router.get('/', postController.searchForPosts);
router.get('/:page', postController.getAllPosts);
router.get('/id/:id', postController.getPostById);
router.get('/amount', postController.getAmountOfPosts);

// Protected routes
router.post('/', postController.createPost);
router.delete('/:id', postController.removePost);
router.put('/:id', postController.updatePost);

module.exports = router;
