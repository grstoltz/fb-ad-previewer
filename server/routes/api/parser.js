const router = require('express').Router();
const path = require('path');
const multer = require('multer');

const parserController = require('../../controllers/parserController');
const campaignController = require('../../controllers/campaignController');

const storage = multer.memoryStorage();

const upload = multer({ storage });

router
  .route('/')
  .post(upload.any(), parserController.parse)
  .post(campaignController.create);

module.exports = router;
