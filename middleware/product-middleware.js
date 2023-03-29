const {ProductDB} = require("../dataBase");
const {statusCode, messageCode} = require("../config");

module.exports = {
    checkProductDate: async (req, res, next) => {
        try {
            const {product_name, title, price, category_id, inventoryNumber, dosage} = req.body;

            if (product_name === '' || title === '' || price === '' || dosage === '') {
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

            next();
        } catch (e) {
            next(e);
        }
    },
};
