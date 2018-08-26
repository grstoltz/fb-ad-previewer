const router = require('express').Router();
const instanceController = require('../../controllers/instanceController');

router.route('/').post(instanceController.createInstance);

router
  .route('/:id')
  .get(instanceController.getInstance)
  .delete(instanceController.deleteInstance);

router.route('/user/:id').get(instanceController.getInstanceByUser);

module.exports = router;
