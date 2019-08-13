const router = require('express').Router();
const mainPostController = require('./mainPostController');

// Public routes
router.get('/', mainPostController.getAllPosts);

// Protected routes
router.post('/', mainPostController.createPost);
router.delete('/:id', mainPostController.removePost);
router.put('/:id', mainPostController.updatePost);

module.exports = router;
