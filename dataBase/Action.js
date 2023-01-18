const {Schema, model} = require('mongoose');

const {ACTION} = require("../config/constants");
const {tokenTypeEnum} = require('../config');
const {USER} = require("../config/user-roles-enum");

const actionSchema = new Schema({
    token: {
        type: String,
        required: true,
        trim: true
    },
    type: {
        type: String,
        required: true,
        enum: Object.values(tokenTypeEnum)
    },
    user_id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: USER
    }
}, {timestamps: true, toObject: {virtuals: true}, toJSON: {virtuals: true}});

actionSchema.pre('findOne', function () {
    this.populate('user_id');
});

module.exports = model(ACTION, actionSchema);
