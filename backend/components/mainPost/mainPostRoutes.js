const router = require('express').Router();
const mainPostController = require('./mainPostController');

// Public routes
router.get('/:page', mainPostController.getAllPosts);
router.get('/id/:id', mainPostController.getMainPostWithId);
router.get('/amount', mainPostController.getAmount);

// Protected routes
router.post('/', mainPostController.createPost);
router.delete('/:id', mainPostController.removePost);
router.put('/:id', mainPostController.updatePost);

module.exports = router;
