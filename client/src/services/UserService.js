import $api from "../http";
//import { AxiosResponse } from "axios";

export default class UserService {
    static async getUsers(){
        return $api.get('/users')
    }

    static async getMyInform(){
        const token = localStorage.token
        return $api.post('/api/user/userInform', {token})
    }
}