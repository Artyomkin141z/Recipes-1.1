import $api from "../http";

export default class RecipeService {
    static async createRecipe(recipe){
        return $api.post('/recipe/create', recipe)
    }
    static async getRecipe(id){
        return $api.post('/recipe/get', {id, token: localStorage.token})
    }

    static async getRecipes(){
        return $api.get('/recipe/get/recipes')
    }

    static async getUserRecipes(){
        return $api.get('/recipe/user')
    }

    static async getLikes(recipeId){
        return $api.post('/recipe/likes', {recipeId})
    }

    static async addLike(recipeId){
        return $api.post('/recipe/add/like', {recipeId})
    }

    static async getUserRecipesBookmarks(){
        return $api.get('/recipe/bookmarks')
    }

    static async addRecipeComment(comment, recipeId){
        return $api.post('/recipe/add/comment', {comment, recipeId})
    }

    static async getRecipeComments(recipeId){
        return $api.post('/recipe/get/comments', {recipeId})
    }
}