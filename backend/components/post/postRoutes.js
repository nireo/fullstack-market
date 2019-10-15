const router = require('express').Router();
const postController = require('./postController');

// Public routes
router.get('/', postController.getAllPosts);
router.get('/:id', postController.getPostById);

// Protected routes
router.post('/', postController.createPost);
router.delete('/:id', postController.removePost);
router.put('/:id', postController.updatePost);

module.exports = router;
