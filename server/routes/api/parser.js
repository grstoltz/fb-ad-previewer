const router = require('express').Router();
const path = require('path');
const multer = require('multer');

const parserController = require('../../controllers/parserController');

const filePath = path.join(__dirname, '..', '..', '/public');
// const storage = multer.diskStorage({
//   destination(req, file, cb) {
//     cb(null, filePath);
//   },
//   filename(req, file, cb) {
//     cb(null, file.originalname);
//   }
// });

const storage = multer.memoryStorage();

const upload = multer({ storage });

router.route('/').post(upload.any(), parserController.parse);

module.exports = router;
