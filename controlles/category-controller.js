const mongoose = require("mongoose");

const {CategoryDB, ProductDB} = require("../dataBase");
const {messageCode, statusCode} = require("../config");

module.exports = {
    getAllCategory: async (req, res, next) => {
        try {
            const categories = await CategoryDB.find();

            if (!categories) {
                return res.status(statusCode.REQUEST_TIMEOUT).json({
                    message: messageCode.TRY_AGAIN_LATER
                });
            }

            res.json(categories);
        } catch (e) {
            console.log(e);
            next(e);
        }
    },
    createCategory: async (req, res, next) => {
        try {
            const category_name = req.body;

            if (category_name.category_name === '') {
                return res.status(statusCode.NOT_FOUND).json({
                    message: messageCode.FILL_FIELDS
                });
            }
            const findCategory = await CategoryDB.findOne(category_name);

            if (findCategory) {
                return res.status(statusCode.BAD_REQUEST).json({
                    message: messageCode.CATEGORY_ALREADY_EXISTS
                });
            }

            const category = await CategoryDB.create(category_name);

            res.json(category);
        } catch (e) {
            next(e);
        }
    },
    filtreCategory: async (req, res, next) => {
        try {
            const filter = req.body;

            if (!filter || filter.checkCategory==='') {
                return res.status(statusCode.NOT_FOUND).json({
                    message: messageCode.NOT_CATEGORY
                });
            }

            const {page, limit} = req.query;

            const options = {
                page: parseInt(page, 10) || 1,
                limit: parseInt(limit, 10) || 5,
            };

            const products = await ProductDB.paginate({
                "category_id": {
                    _id: mongoose.Types.ObjectId(filter.checkCategory)
                }
            }, options);

            if (!products) {
                return res.status(statusCode.NOT_FOUND).json({
                    message: messageCode.NOT_PRODUCT
                });
            }

            res.json(products);
        } catch (e) {
            next(e);
        }
    }
};
