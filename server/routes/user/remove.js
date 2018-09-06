const router = require('express').Router();
const protectedRoute = require('../../services/protectedRoute');
const userController = require('../../controllers/userController');

router.route('/').delete(protectedRoute, userController.deleteUser);
