const router = require('express').Router();
const instanceController = require('../../controllers/instanceController');

router.route('/').post(instanceController.createInstance);

router.route('/:id').get(instanceController.getInstance);

module.exports = router;
