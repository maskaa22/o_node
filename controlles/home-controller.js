const {CalendarDB, TimeDB, UserDB} = require("../dataBase");
const {statusCode, messageCode} = require("../config");

module.exports = {
    createCalendarEvent: async (req, res, next) => {
        try {
            const {description, time} = req.body;

            if (description === '' || time === '') {
                return res.status(statusCode.NOT_FOUND).json({
                    message: messageCode.NOT_FOUND_DATA_EVENT
                });
            }
            const createdEvent = await CalendarDB.create(req.body);

            res.json(createdEvent);
        } catch (e) {
            next(e);
        }
    },
    getCalendarEvent: async (req, res, next) => {
        try {
            const {startDateQuery, endDateQuery} = req.query;

            const events = await CalendarDB.find();

            const newEvents = events.filter(event => event.date >= startDateQuery && event.date <= endDateQuery);

            res.json(newEvents);
        } catch (e) {
            next(e);
        }
    },
    getCalendarEventForId: async (req, res, next) => {
        try {
            const {user_id} = req.query;

            const user = await UserDB.findById({_id: user_id});

            if(!user){
                return res.status(statusCode.NOT_FOUND).json({
                    message: messageCode.NOT_FOUND
                });
            }

            const events = await CalendarDB.find({user_id});

            res.json(events);
        } catch (e) {
            next(e);
        }
    },
    getFindEvent: async (req, res, next) => {
        try {
            const {date} = req.query;

            const events = await CalendarDB.find({date: date});

            if (events.length > 0) {
                const arr = [];
                events.map(async event => {
                    arr.push(event.time);
                });
                const times = await TimeDB.find();
                const newTime = times.filter(e => !arr.includes(e.title));
                res.json(newTime);
            }

            const times = await TimeDB.find();

            res.json(times);
        } catch (e) {
            next(e);
        }
    }
};
