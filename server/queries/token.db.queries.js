class TokenRequests {
    removeToken(token){
        return `DELETE FROM token WHERE token.refreshToken = '${token}'`
    }
    findToken(token){
        return `SELECT * FROM token WHERE token.refreshToken = '${token}'`
    }
}

module.exports = new TokenRequests();