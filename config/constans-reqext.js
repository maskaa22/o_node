module.exports = {
    PASSWORD_REGEXP: new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,128})/),
    EMAIL_REGEXP: new RegExp(/[\w-\.]+@([\w-]+\.)+[\w-]{2,4}/),
    USERNAME_REGEXP: new RegExp(/^[a-z0-9_-]{2,15}$/),
    NAME_REGEXP: new RegExp(/^[a-zA-Z]{2,15}$/),
};
