const ApiError = require('../exceptions/api-error')

const jwt = require('jsonwebtoken')

module.exports = function (req, res, next){
    if(req.method === 'OPTIONS'){
        next()
    }

    try {
        const token = req.headers.authorization.split(' ')[1];
        if(!token){
            return next(ApiError.UnathorizedError())
        }
        else {
            const {admin} = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
            console.log(admin);
            if(admin == 0){
                return next(ApiError.BadRequest('Нет доступа'));
                return res.status(403).json({message: 'Нет доступа'});
            } 
            next();
        }
    } catch (e) {
        return next(ApiError.UnathorizedError())
    }
}