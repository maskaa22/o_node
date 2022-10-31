const router = require('express').Router();

const {productController, orderController} = require('../controlles');
const {orderMiddleware, userMiddleware} = require('../middleware');
const {constantsConfig} = require("../config");

router.get(constantsConfig.THIS, productController.allProduct);

router.post(constantsConfig.THIS, productController.createProduct);

router.delete(constantsConfig.THIS, productController.deleteProduct);

router.get(constantsConfig.ORDERS, orderController.getAllOrders);

router.get(constantsConfig.ORDER_ANALYZE_VISUAL, orderController.getOrdersForAnalys);

router.post(constantsConfig.ORDERS,
    userMiddleware.isUserPresent,
    orderMiddleware.checkEmptyFields,
    orderController.createOrder);

router.patch(constantsConfig.ORDERS, orderController.updateStatusOrder);

router.get(constantsConfig.ARCHIVE_ORDER, orderController.getArchiveOrders);

router.post(constantsConfig.ARCHIVE_ORDER, orderController.archiveOrder);

router.delete(constantsConfig.ARCHIVE_ORDER, orderController.deleteArchiveOrders);

router.get(constantsConfig.ORDER_FILTER, orderController.ordersFilter);

router.get(constantsConfig.ORDER_ANALYZE, orderController.getDataAnalyze);

router.post(constantsConfig.ORDER_ANALYZE, orderController.analyzOrder);

router.patch(constantsConfig.ORDER_ANALYZE, orderController.updateAnalyzOrder);

router.get(constantsConfig.ORDER_BY_USER, orderController.getOrderByIdUser);

module.exports = router;
