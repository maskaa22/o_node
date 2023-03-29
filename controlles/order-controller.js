const {OrderDB, AnalyzeDB, ArchiveDB} = require("../dataBase");
const {statusCode, messageCode} = require("../config");
const {ALL, SELECT} = require("../config/constants");

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
            next(e);
        }
    },
    getOrderByIdUser: async (req, res, next) => {
        try {
            const {user_id} = req.query;

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
            const {month, summa} = req.body;

            const analyze = await AnalyzeDB.findOne({month: month});

            if (analyze) {
                const newSumma = Number(analyze.summa) + Number(summa);

                const newAnalyze = await AnalyzeDB.updateOne({month: month}, {summa: newSumma});

                res.json(newAnalyze);
            } else {
                const analyzeCreate = await AnalyzeDB.create(req.body);

                if (!analyzeCreate) {
                    return res.status(statusCode.CONFLICT).json({
                        message: messageCode.NOT_FOUND_DATA
                    });
                }

                res.json(analyzeCreate);
            }

        } catch (e) {
            next(e);
        }
    },
    getDataAnalyze: async (req, res, next) => {
        try {
            const analyze = await AnalyzeDB.find().select(SELECT);

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

            if (status === ALL) {
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
    }
};
