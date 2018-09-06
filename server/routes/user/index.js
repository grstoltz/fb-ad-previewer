const router = require('express').Router();
const authenticate = require('./authenticate');
const remove = require('./remove');

router.use('/auth', authenticate);
router.use('/delete', remove);

module.exports = router;
