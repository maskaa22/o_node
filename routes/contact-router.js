const router = require('express').Router();

const {contactController} = require('../controlles');
const {constantsConfig} = require("../config");

router.post(constantsConfig.THIS, contactController.sendEmail);

module.exports = router;
