const path = require("path");
const uuid = require("uuid");

const {ProductDB} = require("../dataBase");
const {STATIC, JPG} = require("../config/constants");
const {statusCode, messageCode} = require("../config");
const {deleteFileServise} = require("../servises");

module.exports = {
    createProduct: async (req, res, next) => {
        try {
            const {product_name, title, price, category_id, inventoryNumber, dosage} = req.body;

            const {img} = req.files;

            let fileName = uuid.v4() + JPG;
            const pathFile = path.resolve(__dirname, '..', STATIC, fileName);
            img.mv(pathFile);

            const product = await ProductDB.create({
                product_name,
                title,
                dosage,
                price,
                totalPrice: price,
                count: 1,
                inventoryNumber,
                category_id,
                img: fileName
            });

            if (!product) {
                return res.status(statusCode.NOT_FOUND).json({
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

            const product = await ProductDB.findOne({inventoryNumber: inventoryNumber});

            if (!product) {
                return res.status(statusCode.NOT_FOUND).json({
                    message: messageCode.INVALID_INVENTORY_NUMBER
                });
            }

            if(product.img) {
                deleteFileServise.deleteFile(product.img);
            }

            const products = await ProductDB.deleteOne({inventoryNumber});

            res.json(products);
        } catch (e) {
            next(e);
        }
    },
};
