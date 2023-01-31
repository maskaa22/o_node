const router = require('express').Router();

const {constantsConfig} = require("../config");
const {homeController} = require('../controlles');

router.get(constantsConfig.THIS,
    homeController.getCalendarEvent);

router.get(`/events/:user_id`,
    homeController.getCalendarEventForId);

router.get(constantsConfig.FIND,
    homeController.getFindEvent);

router.post(constantsConfig.THIS,
    homeController.createCalendarEvent);

module.exports = router;
