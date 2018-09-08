const router = require('express').Router();
const contentController = require('../../controllers/contentController');

router.route('/:id').get(contentController.getContent);

module.exports = router;
