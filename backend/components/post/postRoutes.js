const router = require('express').Router();
const postController = require('./postController');

// Public routes
router.get('/:page', postController.getAllPosts);
router.get('/id/:id', postController.getPostById);
router.get('/amount', postController.getAmountOfPosts);
router.post('/search/:term', postController.searchForPost);

// Protected routes
router.post('/', postController.createPost);
router.delete('/:id', postController.removePost);
router.put('/:id', postController.updatePost);

module.exports = router;
