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
    deleteCategory: async (req, res, next) => {
        try {
            const {product_id} = req.params;

            if (!mongoose.Types.ObjectId.isValid(product_id)) {
                return res.status(statusCode.NOT_FOUND).json({
                    message: messageCode.NOT_CATEGORY
                });
            }

            const category = await CategoryDB.findById(product_id);

            if (!category) {
                return res.status(statusCode.NOT_FOUND).json({
                    message: messageCode.NOT_CATEGORY
                });
            }

            // категорію з товарами не видаляємо, щоб товари не лишилися без категорії
            const productsCount = await ProductDB.countDocuments({category_id: category._id});

            if (productsCount > 0) {
                return res.status(statusCode.CONFLICT).json({
                    message: messageCode.CATEGORY_HAS_PRODUCTS
                });
            }

            await CategoryDB.deleteOne({_id: category._id});

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
