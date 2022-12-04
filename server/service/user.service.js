const query = require('../db_conect')
const bcrypt = require('bcrypt')
const UserDto = require('../dtos/user.dto')
const tokenService = require('./token.service')
const ApiError = require('../exceptions/api.error')
const userQueries = require('../queries/user.db.queries')

class UserService {
    checkAdmin(id){
        return `select COUNT(*) as admin from admins where admins.user_id = ${id}`
    }

    async registration(name, surname, login, password, img){
        const hashPassword = await bcrypt.hash(password, 7);

        const result = await query(userQueries.createUser(name, surname, login, hashPassword, img));
        const user = result.recordset[0];
        if(user.error) throw ApiError.BadRequest({message: 'Пользователь с таким логином уже существует'})

        const admin = await query(userQueries.checkAdmin(user.id))
        const isAdmin = admin.recordset[0].admin;

        const userDto = new UserDto({
            login: user.login,
            id: user.id,
            isActivated: true,
            imgUrl: user.imgUrl,
            admin: isAdmin
        })

        const tokens = tokenService.generateTokens({...userDto});

        await tokenService.saveToken(user.id, tokens.refreshToken);

        return {tokens: {...tokens}, user: userDto}
    }

    async login(login, password) {
        const result = await query(userQueries.loginUser(login, password))
        if(result.recordset.length == 0){
            throw ApiError.BadRequest({message: 'Пользователь с таким логином не был найден'})
        }
        console.log('result:', result)
        const user = result.recordset[0];

        const isPassEquels = await bcrypt.compare(password, user.password);
        if(!isPassEquels){
            throw ApiError.BadRequest({message: 'Не верный пароль'})
        }

        const admin = await query(userQueries.checkAdmin(user.id))
        console.log('admin:', admin)
        const isAdmin = admin.recordset[0].admin;

        const userDto = new UserDto({
            login: user.login,
            id: user.id,
            isActivated: true,
            imgUrl: user.imgUrl,
            admin: isAdmin
        })

        const tokens = tokenService.generateTokens({...userDto});

        await tokenService.saveToken(user.id, tokens.refreshToken);

        return {tokens: {...tokens}, user: userDto}
    }

    async logout(refreshToken){
        await tokenService.removeToken(refreshToken);
    }

    async refresh(refreshToken){
        if(!refreshToken) {
            throw ApiError.UnathorizedError();
        }
        const userData = tokenService.validateRefreshToken(refreshToken);
        const tokenDB = await tokenService.findToken(refreshToken);
        const refreshTokenDB = tokenDB?.recordset[0]?.refreshToken;

        if(!userData || !refreshTokenDB){
            throw ApiError.UnathorizedError();
        }

        const result = await query(userQueries.getUser(userData.id))
        const user = result.recordset[0];
        const admin = await query(userQueries.checkAdmin(user.id))
        const isAdmin = admin.recordset[0].admin;

        const userDto = new UserDto({
            login: user.login,
            id: user.id,
            isActivated: true,
            imgUrl: user.imgUrl,
            admin: isAdmin
        })

        const tokens = tokenService.generateTokens({...userDto});

        await tokenService.saveToken(user.id, tokens.refreshToken);
        return {tokens: {...tokens}, user: userDto}
    }

    async getAllUsers(){
        const result = await query(userQueries.getUsers())
        return result.recordset;
    }

    async getUserInform(token){
        const userData = tokenService.validateAccessToken(token);
        //console.log(`userData: ${userData.id}`);
        const result = await query(userQueries.getUser(userData.id))
        //console.log(result.recordset[0])
        return result.recordset[0];
    }
}

module.exports = new UserService();