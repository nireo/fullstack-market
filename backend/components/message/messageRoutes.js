const router = require('express').Router();
const messageController = require('./messageController');

// uses id from token to get needed messages
router.get('/', messageController.getMessages);

// send message
router.post('/:id');

// delete message
router.delete('/:id', messageController.deleteMessage);

module.exports = router;
