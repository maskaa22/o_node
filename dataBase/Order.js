const {Schema, model} = require('mongoose');

const {ORDER} = require("../config/constants");
const {USER} = require("../config/user-roles-enum");

const orderSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: USER
    },
    user_name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        trim: true
    },
    phone: {
        type: String,
        trim: true
    },
    nameSity: {
        type: String,
        trim: true
    },
    nameDepartment: {
        type: String,
        trim: true
    },
    pay: {
        type: String,
        trim: true
    },
    cart: {},
    status: {
        type: String,
        required: true
    },
    summa: {
        type: String,
        required: true
    },
    month: {
        type: String,
        required: true
    }
}, {timestamps: true, toObject: {virtuals: true}, toJSON: {virtuals: true}});

module.exports = model(ORDER, orderSchema);
