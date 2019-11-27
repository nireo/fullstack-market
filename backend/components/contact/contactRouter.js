const router = require('express').Router();
const contactController = require('./contactController');

router.post('/', contactController.createContactMessage);
router.get('/', contactController.getMessages);

module.exports = router;
