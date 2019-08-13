const router = require('express').Router();
const reviewController = require('./reviewController');

// since reviews will be displayed by populating posts + users
// there will be no public review routes
// Private Routes
router.post('/', reviewController.createReview);
router.put('/:id', reviewController.updateReview);
router.delete('/:id', reviewController.createReview);

module.exports = router;
