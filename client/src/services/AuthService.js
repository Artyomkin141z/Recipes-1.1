import $api from "../http";
//import { AxiosResponse } from "axios";

export default class AuthService {
    static async login(login, password){
        return $api.post('/api/login', {login, password})
    }

    static async registration(name, surname,login, password){
        return $api.post('/api/registration', {name, surname, login, password})
    }

    static async logout(){
        return $api.post('/api/logout', {withCredentials: true})
    }
}