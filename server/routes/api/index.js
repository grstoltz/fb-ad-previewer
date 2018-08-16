const router = require('express').Router();
const parserRoutes = require('./parser');
const campaignRoutes = require('./campaign');
const instanceRoutes = require('./instance');

router.use('/parser', parserRoutes);
router.use('/campaign', campaignRoutes);
router.use('/instance', instanceRoutes);

module.exports = router;
