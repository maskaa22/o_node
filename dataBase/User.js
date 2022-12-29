const {Schema, model} = require('mongoose');

const passwordServise = require('../servises/password-servise');
const {USER} = require("../config/user-roles-enum");
const {userRolesEnumConfig} = require('../config');

const userSchema = new Schema({
    name: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        trim: true,
        select: true
    },
    role: {
        type: String,
        default: userRolesEnumConfig.USER,
        enum: Object.values(userRolesEnumConfig)
    },
    phone: {
        type: String,
        trim: true
    },
    foto: {
        type: String,
        trim: true
    },
    surname: {
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
}, {timestamps: true, toObject: {virtuals: true}, toJSON: {virtuals: true}});

userSchema.statics = {
    async createUserWithHashPassword(userObject) {
        const hashedPassword = await passwordServise.hash(userObject.password);

        return this.create({...userObject, password: hashedPassword});
    },
    async updateUserWithHashPassword(userObject, newUser) {
        const hashedPassword = await passwordServise.hash(newUser.password);

        return this.updateOne({...userObject}, {...newUser, password: hashedPassword});
    }
};

module.exports = model(USER, userSchema);
