const {ProductDB} = require("../dataBase");
const {statusCode, messageCode} = require("../config");
const uuid = require("uuid");
const path = require("path");

module.exports = {
    createProduct: async (req, res, next) => {
        try {
            const {product_name, title, price, category_id, inventoryNumber} = req.body;
            //console.log(req.files);
            const {img} = req.files;
             let fileName = uuid.v4()+".jpg";
             const pathFile = path.resolve(__dirname, '..', 'static', fileName);
              img.mv(pathFile);

            if (product_name === '' || title === '' || price === '') {
                return res.status(statusCode.METHOD_NOT_ALLOWED).json({
                    message: messageCode.EMPTY_FIELDS
                });
            }

            const number = await ProductDB.findOne({inventoryNumber: inventoryNumber});

            if (number) {
                return res.status(statusCode.BAD_REQUEST).json({
                    message: messageCode.INVENTORY_NUMBER_IS_ALREADY_USED
                });
            }

            // const product = await ProductDB.create(req.body);
            const product = await ProductDB.create({product_name, title, price, totalPrice: price, count:1, inventoryNumber, category_id, img:fileName});

            if (!product) {
                return res.status(statusCode.BAD_REQUEST).json({
                    message: messageCode.CHECK_THE_DATA
                });
            }
            res.json(product);
        } catch (e) {
            next(e);
        }
    },
    allProduct: async (req, res, next) => {
        try {

            const {page, limit} = req.query;

            const options = {
                page: parseInt(page, 10) || 1,
                limit: parseInt(limit, 10) || 8,
            };

            const products = await ProductDB.paginate({}, options);

            res.json(products);
        } catch (e) {
            next(e);
        }
    },
    deleteProduct: async (req, res, next) => {
        try {

            const {inventoryNumber} = req.query;

            if (!inventoryNumber) {
                return res.status(statusCode.BAD_REQUEST).json({
                    message: messageCode.ENTER_THE_INVENTORY_NUMBER
                });
            }

            const number = await ProductDB.find({inventoryNumber: inventoryNumber});

            if (!number) {
                return res.status(statusCode.NOT_FOUND).json({
                    message: messageCode.INVALID_INVENTORY_NUMBER
                });
            }

            const products = await ProductDB.deleteOne({inventoryNumber});

            res.json(products);
        } catch (e) {
            next(e);
        }
    },
};
