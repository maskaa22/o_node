const { Schema, model } = require('mongoose');

const { userRolesEnumConfig } = require('../config');
const passwordServise = require('../servises/password-servise');

const userSchema = new Schema({
    name: {
        type: String,
        // required: true,
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
       // required: true,
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
        // required: true,
        trim: true
    },
    foto: {
        type: String,
        // required: true,
        trim: true
    },
    surname: {
        type: String,
        // required: true,
        trim: true
    },
    nameSity: {
        type: String,
        // required: true,
        trim: true
    },
    nameDepartment: {
        type: String,
        // required: true,
        trim: true
    },
}, { timestamps: true, toObject: { virtuals: true }, toJSON: { virtuals: true } });

userSchema.statics = {
    async createUserWithHashPassword(userObject) {
        const hashedPassword = await passwordServise.hash(userObject.password);

        return this.create({ ...userObject, password: hashedPassword });
    },
    async updateUserWithHashPassword(userObject, newUser) {
        const hashedPassword = await passwordServise.hash(newUser.password);

        return this.updateOne({ ...userObject}, {...newUser, password: hashedPassword });
    }
};

module.exports = model('user', userSchema);
