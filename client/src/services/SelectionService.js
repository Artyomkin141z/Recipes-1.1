import $api from "../http";

export default class SelectionService {
    static async createSelection(selection){
        return $api.post('/selection/create', selection)
    }

    static async getSelections(){
        return $api.get('/selection/get')
    }

    static async getSelection(id){
        return $api.post('/selection/getOne', {id})
    }

    static async getLikes(id){
        return $api.post('/selection/getLikes', {id})
    }

    static async addLike(selectionId){
        return $api.post('/selection/add/like', {selectionId})
    }

    static async getUserSelection(){
        return $api.get('/selection/getSelections')
    }

    static async getUserSelectionsBookmarks(){
        return $api.get('/selection/bookmarks')
    }

    static async deleteSelection(id){
        return $api.post('/selection/delete', {id})
    }
}