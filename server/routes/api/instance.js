const router = require('express').Router();
const multer = require('multer');
const protectedRoute = require('../../services/protectedRoute');
const instanceController = require('../../controllers/instanceController');

const storage = multer.memoryStorage();

const upload = multer({ storage });

router.route('/user').get(protectedRoute, instanceController.getInstanceByUser);

router
  .route('/:id')
  .post(protectedRoute, instanceController.createInstance)
  .get(instanceController.getInstance)
  .delete(instanceController.deleteInstance);

router
  .route('/')
  .post([upload.any(), protectedRoute], instanceController.createInstance);

module.exports = router;
