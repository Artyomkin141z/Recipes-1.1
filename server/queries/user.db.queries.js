class UserRequests {
    createUser(name, surname, login, password, img){
        let str = `exec dbo.addUser ${name}, ${surname}, ${login}, '${password}'`
        if (img !== undefined) str += `, ${img}`
        return str;
    }
    loginUser(login){
        return `select * from users
                where users.login = '${login}'`
    }
    checkAdmin(id){
        return `select COUNT(*) as admin from admins where admins.user_id = '${id}'`
    }
    getUser(id){
        return `select * from users where users.id = ${id}`
    }
    getUsers(){
        return `select * from users`
    }
}

module.exports = new UserRequests();