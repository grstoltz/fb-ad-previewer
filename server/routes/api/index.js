const router = require('express').Router();
const parserRoutes = require('./parser');
const campaignRoutes = require('./campaign');

router.use('/parser', parserRoutes);
router.use('/campaign', campaignRoutes);

module.exports = router;
