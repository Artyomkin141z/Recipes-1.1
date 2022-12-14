import axios from 'axios';

export const API_URL = 'http://localhost:8080'

const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL
})

$api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    return config;
})

$api.interceptors.response.use((config) => {
    return config;
}, async (error) => {
    const originalRequest = error.config;
    if(error.response.status === 401 && error.config && !originalRequest._isRetry){
        console.log('Сработала ошибка')
        originalRequest._isRetry = true;
        try{
            const responce = await axios.get(`${API_URL}/api/refresh`, {withCredentials: true})
            localStorage.setItem('token', responce.data.tokens.accessToken)
            return $api.request(originalRequest);
        }catch(e){
            console.log('Не авторизован');
        }
    }
    throw error;
})

export default $api;