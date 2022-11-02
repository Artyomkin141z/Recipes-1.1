const ApiError = require('../exceptions/api.error')

const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    if(req.method === 'OPTIONS'){
        next()
    }

    try {
        const token = req.headers.authorization.split(' ')[1];
        //console.log('token', token)
        if(!token){
            return next(ApiError.UnathorizedError())
        }
        else {
            const decodedData = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
            req.user = decodedData.id
            //console.log('req.user: ',req.user)
            next();
        }
    } catch (e) {
        return next(ApiError.UnathorizedError())
    }
}