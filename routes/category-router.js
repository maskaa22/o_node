const router = require('express').Router();

const {categoryController} = require('../controlles');
const {constantsConfig} = require("../config");

router.get(constantsConfig.THIS, categoryController.getAllCategory);

router.post(constantsConfig.THIS, categoryController.createCategory);

router.post(constantsConfig.PRODUCT_ID, categoryController.filtreCategory);

router.delete(constantsConfig.PRODUCT_ID, categoryController.deleteCategory);

module.exports = router;
