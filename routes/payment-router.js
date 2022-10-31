const {paymentController} = require("../controlles");
const {constantsConfig} = require("../config");
const router = require('express').Router();

router.post(constantsConfig.THIS, paymentController.payment);

module.exports = router;
