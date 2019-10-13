const router = require('express').Router();
const reportController = require('./reportController');

router.post('/:id', reportController.createReport);
router.get('', reportController.getReports);
router.delete('/:id', reportController.deleteReports);

module.exports = router;
