const router = require('express').Router();
const instanceController = require('../../controllers/instanceController');

router.route('/:id').get(instanceController.findById);

module.exports = router;
