const router = require('express').Router();
const loginController = require('./loginController');

router.post('/', loginController.loginHandler);

module.exports = router;
