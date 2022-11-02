import $api from "../http";
//import { AxiosResponse } from "axios";

export default class UserService {
    static async getUsers(){
        return $api.get('/users')
    }

    static async getOneUser(){
        return $api.get('/api/user')
    }
}