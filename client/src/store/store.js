import {makeAutoObservable} from 'mobx'
import AuthService from '../services/AuthService';
import axios from 'axios'
import {API_URL} from '../http/index'

export default class Store{
    user = 0;
    isAuth = false;
    isLoading = false;

    constructor() {
        makeAutoObservable(this);
    }

    setAuth(bool){
        this.isAuth = bool;
    }

    setUser(user){
        this.user = user;
    }
    getUser(){
        return this.user;
    }

    setLoading(bool){
        this.isLoading = bool;
    }

    async login(login, password){
        try{
            const response = await AuthService.login(login, password);
            //console.log(response);
            localStorage.setItem('token', response.data.tokens.accessToken)
            this.setAuth(true);
            this.setUser(response.data.user.id)
            console.log(response.data.user);
            return response.status
        }catch(e){
            console.log(e.response?.data?.message)
        }
    }

    async logout(){
        try{
            await AuthService.logout();
            //console.log(response);
            localStorage.removeItem('token')
            this.setAuth(false);
            this.setUser(0)
        }catch(e){
            console.log(e)
        }
    }

    async registration(name, surname, login, password){
        try{
            return await AuthService.registration(name, surname, login, password);
            //console.log('responce', responce);
        }catch(e){
            window.message = 'message'
            console.log(e.response?.data?.message)
        }
    }

    async checkAuth() {
        this.setLoading(true);
        try{
            const response = await axios.get(`${API_URL}/api/refresh`, {withCredentials: true})
            console.log(response);
            localStorage.setItem('token', response.data.tokens.accessToken)
            this.setAuth(true);
            this.setUser(response.data.user.id)
        }catch(e){
            console.log(e.response?.data?.message)
        }finally{
            this.setLoading(false);
        }
    }
}