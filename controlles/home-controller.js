const {CalendarDB, TimeDB} = require("../dataBase");

module.exports = {
    createCalendarEvent: async (req, res, next) => {
        try {

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
    getFindEvent: async (req, res, next) => {
        try {

            const {date} = req.query;

            const events = await CalendarDB.find({date: date});

            if (events.length > 0) {
                const arr = [];
                events.map(async event => {
                    arr.push(event.time)
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
