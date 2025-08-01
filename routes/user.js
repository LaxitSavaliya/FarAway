const express = require('express');
const router = express.Router();
const wrapAsync = require('../utils/wrapAsync');
const passport = require('passport');
const { saveRedirectUrl, validateSignup } = require('../middleware');
const userController = require('../controllers/users');

// Signup
router.route('/signup')
    .get(userController.renderSignup)
    .post(validateSignup, wrapAsync(userController.signup));

// Login
router.route('/login')
    .get(userController.renderLoginForm)
    .post(saveRedirectUrl, passport.authenticate('local', {
        failureRedirect: '/login',
        failureFlash: true,
        successFlash: 'Welcome back!'
    }), userController.login);

// Logout (should be POST for security, but GET for legacy support)
router.post('/logout', userController.logout);
router.get('/logout', userController.logout);

// Username/email availability checks (for AJAX validation)
router.get('/check-username', wrapAsync(userController.checkUsername));
router.get('/check-email', wrapAsync(userController.checkEmail));

module.exports = router;