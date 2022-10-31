const {CategoryDB, ProductDB} = require("../dataBase");
const mongoose = require("mongoose");
const {messageCode, statusCode} = require("../config");

module.exports = {
    getAllCategory: async (req, res, next) => {
        try {
            const categories = await CategoryDB.find();

            if(!categories){
                return res.status(statusCode.REQUEST_TIMEOUT).json({
                    message: messageCode.TRY_AGAIN_LATER
                })
            }

            res.json(categories);
        } catch (e) {
            console.log(e);
            next(e);
        }
    },
    createCategory: async (req, res, next) => {
        try {
            const category_name  = req.body;

            if(category_name.category_name === ''){
                return res.status(statusCode.METHOD_NOT_ALLOWED).json({
                    message: messageCode.EMPTY_FIELDS
                })
            }
            const findCategory = await CategoryDB.findOne(category_name);

            if(findCategory){
                return res.status(statusCode.METHOD_NOT_ALLOWED).json({
                    message: messageCode.CATEGORY_ALREADY_EXISTS
                })
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

            if (!filter) {
                return res.status(statusCode.NOT_FOUND).json({
                    message: messageCode.NOT_CATEGORY
                })
            }
            // let {limit, page} =req.query;
            // console.log(li);

            // page = page || 1;
            // limit = limit || 9;
            // let offset = page * limit - limit;

            const { page, limit } = req.query;
// console.log(page, limit);
            const options = {
                page: parseInt(page, 10) || 1,
                limit: parseInt(limit, 5) || 5,
            };


            const products = await ProductDB.paginate({"category_id": {
                    _id: mongoose.Types.ObjectId(filter.checkCategory)}}, options);

            //???????????hz
            if(!products) {
                return res.status(statusCode.NOT_FOUND).json({
                    message: messageCode.NOT_PRODUCT
                })
            }

             // const products = await ProductDB.find({"category_id": {
             //     _id: mongoose.Types.ObjectId(filter.checkCategory)}});

            res.json(products);
        } catch (e) {
            next(e);
        }
    }
}
