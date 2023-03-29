const router = require('express').Router();

const {constantsConfig} = require("../config");
const {orderMiddleware, userMiddleware, productMiddleware} = require('../middleware');
const {productController, orderController} = require('../controlles');

router.get(constantsConfig.THIS, productController.allProduct);

router.get(constantsConfig.ORDER_ANALYZE, orderController.getDataAnalyze);

router.get(constantsConfig.ORDER_BY_USER, orderController.getOrderByIdUser);

router.get(constantsConfig.ORDER_FILTER, orderController.ordersFilter);

router.get(constantsConfig.ARCHIVE_ORDER, orderController.getArchiveOrders);

router.get(constantsConfig.ORDERS, orderController.getAllOrders);

router.patch(constantsConfig.ORDERS, orderController.updateStatusOrder);

router.delete(constantsConfig.ARCHIVE_ORDER, orderController.deleteArchiveOrders);

router.delete(constantsConfig.THIS, productController.deleteProduct);

router.post(constantsConfig.ARCHIVE_ORDER, orderController.archiveOrder);

router.post(constantsConfig.ORDER_ANALYZE, orderController.analyzOrder);

router.post(constantsConfig.ORDERS,
    userMiddleware.isUserPresent,
    orderMiddleware.checkEmptyFields,
    orderController.createOrder);

router.post(constantsConfig.THIS,
    productMiddleware.checkProductDate,
    productController.createProduct);

module.exports = router;
