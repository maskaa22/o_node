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
    passwordToo: {
        type: String,
        trim: true,
        select: true
    },
    phone: {
        type: String,
        trim: true
    },
    foto: {
        type: String,
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
    is_active: {
        type: Boolean,
        default: false,
        required: true
    }
}, {timestamps: true, toObject: {virtuals: true}, toJSON: {virtuals: true}});

userSchema.statics = {
    async createUserWithHashPassword(userObject) {
        const hashedPassword = await passwordServise.hash(userObject.password);
        const hashedPasswordToo = await passwordServise.hash(userObject.passwordToo);

        return this.create({...userObject, password: hashedPassword, passwordToo: hashedPasswordToo});
    },
    async updateUserWithHashPassword(userObject, newUser) {
        const hashedPassword = await passwordServise.hash(newUser.password);

        return this.updateOne({...userObject}, {...newUser, password: hashedPassword});
    }
};

module.exports = model(USER, userSchema);
