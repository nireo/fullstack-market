const router = require('express').Router();
const contactController = require('./contactController');

router.post('/', contactController.createContactMessage);

module.exports = router;
