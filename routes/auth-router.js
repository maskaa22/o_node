const router = require('express').Router();

const {check} = require("express-validator");
const {authController} = require('../controlles');
const {authMiddleware} = require('../middleware');
const {messageCode, constantsConfig} = require("../config");

router.get(constantsConfig.ACTIVATE_TOKEN, authMiddleware.checkActivateToken, authController.activate);

router.get(constantsConfig.LOGOUT,
    authController.logout);

router.get(constantsConfig.REFRESH,
    authMiddleware.delOldToken,
    authController.refresh);

router.delete(constantsConfig.THIS, authController.deleteUser);

router.post(constantsConfig.EMAIL_FOR_RESET_PASSWORD,
    authMiddleware.isUserEmailPresent,
    authController.sendEmailForResetPassword);

router.post(constantsConfig.LOGIN,
    authMiddleware.isUserEmailPresent,
    authMiddleware.isUserPasswordPresent,
    authController.login);

router.post(constantsConfig.REGISTRATION,
    check(constantsConfig.EMAIL, messageCode.INCORRECT_EMAIL).isEmail(),
    check(constantsConfig.PASSWORD, messageCode.MINIMUM_LENGTH_PASSWORD).isLength({min: 6}),
    authMiddleware.isUserEmailNotPresent,
    authMiddleware.checkPasswordForDublicate,
    authController.register);

router.patch(constantsConfig.RESET_PASSWORD,
    check(constantsConfig.PASSWORD, messageCode.MINIMUM_LENGTH_PASSWORD).isLength({min: 6}),
    authMiddleware.checkPassword,
    authMiddleware.checkPasswordForDublicate,
    authController.resetPassword);

module.exports = router;
