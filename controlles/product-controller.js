const {ProductDB, CategoryDB} = require("../dataBase");


module.exports = {
    createProduct: async (req, res, next) => {
        try {
            const {product_name, title, price, category_id} = req.body;

            if(product_name==='' || title==='' || price===''){
                return res.status(402).json({
                    message: "Проверьте незаполненые поля"
                })
            }

             const product = await ProductDB.create(req.body)
            // const product = await ProductDB.create({
            //     ...req.body,
            //     category_id:category_id
            // })
            if (!product) {
                return res.status(400).json({
                    message: "Проверьте данные"
                })
            }


            res.json(product);
        } catch (e) {
            next(e);
        }
    },
    allProduct: async (req, res, next) => {
        try {
            const products = await ProductDB.find();

            res.json(products);
        } catch (e) {
            next(e);
        }
    },

}
