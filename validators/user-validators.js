const Joi = require('joi');

const {
    constantsGerexpConfig: { EMAIL_REGEXP, PASSWORD_REGEXP, USERNAME_REGEXP, NAME_REGEXP }, userRolesEnumConfig
} = require('../config');

const validator = Joi.object({
    username: Joi.string().regex(USERNAME_REGEXP)
        .trim()
        .required(),
    first_name: Joi.string().regex(NAME_REGEXP),
    last_name: Joi.string().regex(NAME_REGEXP),
    email: Joi.string().regex(EMAIL_REGEXP).required(),
    user_type: Joi.string().allow(...Object.values(userRolesEnumConfig)),
    password: Joi.string().regex(PASSWORD_REGEXP),
    pereatPassword: Joi.string(),
});
const empty = Joi.object({
    name: Joi.string().min(1),
    email: Joi.string().min(1),
    user_type: Joi.string().min(1),
    password: Joi.string().min(1)
});

module.exports = {
    validator,
    empty
};
