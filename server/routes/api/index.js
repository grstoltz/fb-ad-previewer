const router = require('express').Router();
const contentRoutes = require('./content');
const instanceRoutes = require('./instance');

router.use('/content', contentRoutes);
router.use('/instance', instanceRoutes);

module.exports = router;
