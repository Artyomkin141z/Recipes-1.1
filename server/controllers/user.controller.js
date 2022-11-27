const userService = require('../service/user.service');
const UserService= require('../service/user.service')

class UserController {
    async registartion(req, res, next){
        try{
            const {name, surname, login, password, img} = req.body
            const userData = await userService.registration(name, surname, login, password, img);
            res.cookie('refreshToken', userData.tokens.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.json(userData);
        }catch(e){
            next(e);
        }
    }

    async login(req, res, next){
        try{
            const {login, password} = req.body
            const userData = await userService.login(login, password)
            res.cookie('refreshToken', userData.tokens.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.json(userData);
        }catch(e){
            next(e);
        }
    }

    async logout(req, res, next){
        try{
            const {refreshToken} = req.cookies;
            const token = await userService.logout(refreshToken);
            res.clearCookie('refreshToken');
            return res.status(200).json({message: 'Пользователь успешно реавторизовался'});
        }catch(e){
            next(e);
        }
    }

    async refresh(req, res, next){
        try{
            const {refreshToken} = req.cookies;
            const userData = await userService.refresh(refreshToken)
            //console.log(userData);
            res.cookie('refreshToken', userData.tokens.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.json(userData);
        }catch(e){
            next(e);
        }
    }

    async getUsers(req, res, next){
        try{
            const users = await userService.getAllUsers();
            return res.json({users: users});
        }catch(e){
            next(e);
        }
    }

    async getUserInform(req, res, next){
        try{
            const token = req.body.token;
            //console.log(`token: ${token}`)
            const user = await userService.getUserInform(token);
            //console.log('user', user)
            return res.json({user: user});
        }catch(e){
            next(e);
        }
    }
}

module.exports = new UserController();