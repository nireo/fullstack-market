const router = require('express').Router();
const reportController = require('./reportController');

router.post('/:id', reportController.createReport);
router.get('/', reportController.getReports);
router.get('/page/:page', reportController.getReportInPages);
router.get('/:id', reportController.getReportById);
router.delete('/:id', reportController.deleteReports);

module.exports = router;
