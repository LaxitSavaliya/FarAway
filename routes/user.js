const express = require('express');
const router = express.Router();
const wrapAsync = require('../utils/wrapAsync');
const passport = require('passport');
const { saveRedirectUrl, validateSignup } = require('../middleware');
const userController = require('../controllers/users');

router.route('/signup')
    .get(userController.renderSignup)
    .post(validateSignup, wrapAsync(userController.signup));

router.route('/login')
    .get(userController.renderLoginForm)
    .post(saveRedirectUrl, passport.authenticate('local', {
        failureRedirect: '/login',
        failureFlash: true,
        successFlash: 'Welcome back!'
    }), userController.login);

router.post('/logout', userController.logout);
router.get('/logout', userController.logout);

router.get('/check-username', wrapAsync(userController.checkUsername));
router.get('/check-email', wrapAsync(userController.checkEmail));

module.exports = router;