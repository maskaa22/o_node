const router = require('express').Router();

const { categoryController } = require('../controlles');

router.get('/', categoryController.getAllCategory);

router.post('/', categoryController.createCategory);

router.post('/:product_id', categoryController.filtreCategory);

module.exports = router;
