module.exports = class UserDto {
    email;
    _id;
    name;
    phone;
    surname;
    nameSity;
    nameDepartment;

    constructor(model) {
        this.email = model.email;
        this._id = model._id;
        this.name = model.name;
        this.phone = model.phone;
        this.surname = model.surname;
        this.nameSity = model.nameSity;
        this.nameDepartment = model.nameDepartment;
    }
}
