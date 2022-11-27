import $api from "../http";

export default class CatalogService {
    static async getIngredients(){
        return $api.get('/catalog/get/ingredients')
    }

    static async addIngredient(ingredient){
        //console.log(ingredient);
        return $api.post('/catalog/create/ingredient', {ingredient})
    } 
}