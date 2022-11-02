import $api from "../http";

export default class CatalogService {
    static async getIngredients(){
        return $api.get('/api/get/ingredients')
    }
}