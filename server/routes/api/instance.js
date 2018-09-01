const router = require('express').Router();
const protectedRoute = require('../../services/protectedRoute');
const instanceController = require('../../controllers/instanceController');

router.route('/').post(protectedRoute, instanceController.createInstance);

router
  .route('/:id')
  .get(instanceController.getInstance)
  .delete(protectedRoute, instanceController.deleteInstance);

router
  .route('/user/:id')
  .get(protectedRoute, instanceController.getInstanceByUser);

module.exports = router;
