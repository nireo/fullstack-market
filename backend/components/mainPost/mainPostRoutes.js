const router = require('express').Router();
const mainPostController = require('./mainPostController');

// Public routes
router.get('/', mainPostController.getAllPosts);

// Protected routes
router.post('/', mainPostController.createPost);

module.exports = router;
