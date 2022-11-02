import $api from "../http";

export default class UserService {
    static async createRecipe(recipe){
        return $api.post('/recipe/create', recipe)
    }
}