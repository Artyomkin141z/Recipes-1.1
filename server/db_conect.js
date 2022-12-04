const sql = require('mssql')

var config = {
    user: 'sa',
    password: '1111',
    port: 1523,
    server: 'GILA\\GILA', 
    database: 'RecipesDB',
    synchronize: true,
    trustServerCertificate: true,
};

async function connection(req){
    try {
        await sql.connect(config)
        const result = await sql.query(req)
        return result
    } catch (err) {
        console.log(err);
    }
}

module.exports = connection