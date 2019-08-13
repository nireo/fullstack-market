const router = require('express').Router();
const reviewController = require('./reviewController');

// since reviews will be displayed by populating posts + users
// there will be no public review routes
// Private Routes
router.post('/main/:id', reviewController.addReviewToMain);
router.post('/post/:id', reviewController.addReviewToPost);
router.put('/:id', reviewController.updateReview);
router.delete('/:id', reviewController.createReview);

module.exports = router;
