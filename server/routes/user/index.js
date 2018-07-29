const router = require('express').Router();
const signup = require('./signup');
const login = require('./login');
const logout = require('./logout');
const activate = require('./activate');
const resetPasswordHandler = require('./resetPasswordHandler');
const resetPasswordEmail = require('./resetPasswordEmail');

router.use('/signup', signup);
router.use('/login', login);
router.use('/logout', logout);
router.use('/activate', activate);
router.use('/resetpasswordemail', resetPasswordEmail);
router.use('/resetpasswordhandler', resetPasswordHandler);

module.exports = router;
