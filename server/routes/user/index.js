const router = require('express').Router();

const authenticate = require('./authenticate');

router.use('/auth', authenticate);

module.exports = router;
