const {CategoryDB, ProductDB} = require("../dataBase");
const mongoose = require("mongoose");

module.exports = {
    getAllCategory: async (req, res, next) => {
        try {
            const categories = await CategoryDB.find();

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
                return res.status(402).json({
                    message: "Проверьте незаполненые поля"
                })
            }
            const findCategory = await CategoryDB.findOne(category_name);

            if(findCategory){
                return res.status(402).json({
                    message: "Даная категория повторяеться"
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

             const products = await ProductDB.find({"category_id": {_id: mongoose.Types.ObjectId(filter.checkCategory)}});

            res.json(products);
        } catch (e) {
            next(e);
        }
    }
}
