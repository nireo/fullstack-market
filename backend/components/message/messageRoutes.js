const router = require('express').Router();

// uses id from token to get needed messages
router.get('/');

// send message
router.post('/:id');

// delete message
router.delete('/:id');

module.exports = router;
