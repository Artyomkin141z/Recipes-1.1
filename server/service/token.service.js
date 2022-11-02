const jwt = require('jsonwebtoken')
const query = require('../db_conect')
const tokenQueries = require('../queries/token.db.queries')

class TokenService {
    generateTokens(payload) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn: '30m'})
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn: '30d'})
        return {
            accessToken,
            refreshToken
        }
    }

    validateAccessToken(token){
        try {
            const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET)
            return userData;
        } catch(e) {
            return null;
        }
    }

    validateRefreshToken(token){
        try {
            const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET)
            return userData;
        } catch(e) {
            return null;
        }
    }

    async saveToken(userId, refreshToken) {
        const str = `exec dbo.createToken '${userId}', '${refreshToken}'`
        await query(str);
    }

    async removeToken(refreshToken){
        await query(tokenQueries.removeToken(refreshToken));
    }

    async findToken(token){
        const result = await query(tokenQueries.findToken(token))
        return result;
    }
}

module.exports = new TokenService();