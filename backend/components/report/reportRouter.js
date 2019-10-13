const router = require('express').Router();
const reportController = require('./reportController');

router.post('/:id', reportController.createReport);

module.exports = router;
