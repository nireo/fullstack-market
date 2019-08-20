const router = require('express').Router();
const messageController = require('./messageController');

// Private routes
router.post('/', messageController.createMessage);
router.delete('/:id', messageController.deleteMessage);

module.exports = router;
