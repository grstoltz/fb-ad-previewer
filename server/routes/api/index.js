const router = require('express').Router();
const parserRoutes = require('./parser');

router.use('/parser', parserRoutes);

module.exports = router;
