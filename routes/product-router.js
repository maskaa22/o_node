const router = require('express').Router();

const { productController } = require('../controlles');

router.get('/', productController.allProduct);

router.post('/', productController.createProduct);





module.exports = router;
