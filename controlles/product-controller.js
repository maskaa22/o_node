
 const {ProductDB} = require("../dataBase");

module.exports = {
    createProduct: async (req, res, next) => {
        try {
            const {product_name, title, price} = req.body;

            if(product_name==='' || title==='' || price===''){
                return res.status(402).json({
                    message: "Проверьте незаполненые поля"
                })
            }

             const product = await ProductDB.create(req.body);

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

            const { page, limit } = req.query;

            const options = {
                page: parseInt(page, 10) || 1,
                limit: parseInt(limit, 5) || 5,
            };

            const products = await ProductDB.paginate({}, options);

             // const products = await ProductDB.paginate({}, {limit});

            // const products = await ProductDB.find().limit(limit);

            res.json(products);
        } catch (e) {
            next(e);
        }
    },

}
