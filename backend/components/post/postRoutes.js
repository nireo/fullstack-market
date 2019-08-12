const router = require('express').Router();
const postController = require('./postController');

// Public routes
router.get('/', postController.getAllPosts);

// Protected routes
router.post('/', postController.createPost);

module.exports = router;
