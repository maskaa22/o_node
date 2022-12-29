const {OrderDB, AnalyzeDB, ArchiveDB} = require("../dataBase");
const {statusCode, messageCode} = require("../config");

module.exports = {
    getAllOrders: async (req, res, next) => {
        try {

            const orders = await OrderDB.find();

            if (!orders) {
                return res.status(statusCode.NOT_FOUND).json({
                    message: messageCode.NOT_ORDER
                });
            }

            res.json(orders);
        } catch (e) {
            console.log(e);
            next(e);
        }
    },
    getOrdersForAnalys: async (req, res, next) => {
        try {

            const orders = await OrderDB.find().select('-createdAt -updatedAt -__v -_id -id -cart' +
                ' -month -user_name -user_id -nameDepartment -nameSity -pay -phone -surname');

            if (!orders) {
                return res.status(statusCode.NOT_FOUND).json({
                    message: messageCode.NOT_ORDER
                });
            }

            res.json(orders);
        } catch (e) {
            console.log(e);
            next(e);
        }
    },
    createOrder: async (req, res, next) => {
        try {

            const order = await OrderDB.create(req.body);

            if (!order) {
                return res.status(statusCode.CONFLICT).json({
                    message: messageCode.NOT_CREATE_ORDER
                });
            }

            res.json(order);
        } catch (e) {
            next(e);
        }
    },
    updateStatusOrder: async (req, res, next) => {
        try {

            const {_id, status} = req.body;

            const orders = await OrderDB.updateOne({_id: _id}, {status: status});

            if (!orders) {
                return res.status(statusCode.CONFLICT).json({
                    message: messageCode.NOT_UPDATE_STATUS
                });
            }

            res.json(orders);
        } catch (e) {
            console.log(e);
            next(e);
        }
    },
    getOrderByIdUser: async (req, res, next) => {
        try {
            const {user_id} = req.params;

            const users = await OrderDB.find({user_id});

            if (!users) {
                return res.status(statusCode.CONFLICT).json({
                    message: messageCode.NOT_FIND_ORDER
                });
            }
            res.json(users);
        } catch (e) {
            next(e);
        }
    },
    analyzOrder: async (req, res, next) => {
        try {

            const analyze = await AnalyzeDB.create(req.body);

            if (!analyze) {
                return res.status(statusCode.CONFLICT).json({
                    message: messageCode.NOT_FOUND_DATA
                });
            }

            res.json(analyze);
        } catch (e) {
            console.log(e);
            next(e);
        }
    },
    updateAnalyzOrder: async (req, res, next) => {
        try {

            const {month, summa} = req.body;

            const analyze = await AnalyzeDB.findOne({month: month});

            if (!analyze) {
                return res.status(statusCode.CONFLICT).json({
                    message: messageCode.NOT_FOUND_DATA
                });
            }

            const oldSumma = analyze.summa;
            const newSumma = Number(oldSumma) + Number(summa);

            const newAnalyze = await AnalyzeDB.updateOne({month: month}, {summa: newSumma});

            if (!newAnalyze) {
                return res.status(statusCode.CONFLICT).json({
                    message: messageCode.NOT_UPDATE_DATA
                });
            }

            res.json(newAnalyze);
        } catch (e) {
            console.log(e);
            next(e);
        }
    },
    getDataAnalyze: async (req, res, next) => {
        try {

            const analyze = await AnalyzeDB.find().select('-createdAt -updatedAt -__v -_id -id');

            if (!analyze) {
                return res.status(statusCode.NOT_FOUND).json({
                    message: messageCode.NOT_FOUND_DATA
                });
            }

            res.json(analyze);
        } catch (e) {
            next(e);
        }
    },
    ordersFilter: async (req, res, next) => {
        try {

            const {status} = req.query;

            if (!status) {
                return res.status(statusCode.CONFLICT).json({
                    message: messageCode.NOT_STATUS
                });
            }

            if (status === 'все') {
                const filter = await OrderDB.find();
                res.json(filter);
            }
            const filter = await OrderDB.find({status});

            if (!filter) {
                return res.status(statusCode.CONFLICT).json({
                    message: messageCode.NOT_FIND_ORDER
                });
            }

            res.json(filter);
        } catch (e) {
            next(e);
        }
    },
    archiveOrder: async (req, res, next) => {
        try {

            const {_id} = req.body;

            const order = await OrderDB.findById({_id});

            if (!order) {
                return res.status(statusCode.CONFLICT).json({
                    message: messageCode.NOT_FIND_ORDER
                });
            }

            const archive = await ArchiveDB.create({
                user_id: order.user_id,
                user_name: order.user_name,
                cart: order.cart,
                status: order.status,
                summa: order.summa
            });

            if (!archive) {
                return res.status(statusCode.CONFLICT).json({
                    message: messageCode.NOT_CREATE_ORDER_IN_ARCHIVE
                });
            }

            const newOrder = await OrderDB.deleteOne({_id});

            res.json(newOrder);
        } catch (e) {
            console.log(e);
            next(e);
        }
    },
    getArchiveOrders: async (req, res, next) => {
        try {

            const archive = await ArchiveDB.find();

            if (!archive) {
                return res.status(statusCode.CONFLICT).json({
                    message: messageCode.NOT_ORDER
                });
            }

            res.json(archive);
        } catch (e) {
            next(e);
        }
    },
    deleteArchiveOrders: async (req, res, next) => {
        try {

            const {_id} = req.query;

            const del = await ArchiveDB.deleteOne({_id});

            res.json(del);
        } catch (e) {
            next(e);
        }
    },
};
