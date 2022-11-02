module.exports = class UserDto{
    login;
    id;
    isActivated;
    imgUrl;
    admin;

    constructor(model){
        this.id = model.id;
        this.admin = model.admin;
        this.isActivated = model.isActivated;
        this.login = model.login;
        this.imgUrl = model.imgUrl;
    }
}