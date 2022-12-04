const query = require('../db_conect')
const bcrypt = require('bcrypt')
const UserDto = require('../dtos/user.dto')
const tokenService = require('./token.service')
const ApiError = require('../exceptions/api.error')
const recipeQueries = require('../queries/recipe.db.queries')

class RecipeService {
    async create(userId, title, content, nServings, time){
        const result = await query(recipeQueries.create(userId, title, content, nServings, time))
        console.log('RecipeService', result)
        return result.recordset;
    }

    async addSteps(recipeId, steps){
        await query(recipeQueries.addSteps(recipeId, steps));
    }

    async createAdvice(recipeId, advice){
        await query(recipeQueries.addAdvice(recipeId, advice));
    }

    async addEnergyValue(recipeId, energyValue){
        await query(recipeQueries.addEnergyValue(recipeId, energyValue))
    }

    async createIngredient(ingredient){
        const result =  await query(recipeQueries.createIngredient(ingredient))
        return result.recordsets;
    }

    async getIngredients(){
        const result =  await query(recipeQueries.getIngredients())
        return result.recordset;
    }

    async addIngredients(recipeId, ingredients){
        await query(recipeQueries.addIngredients(recipeId, ingredients))
    }

    async getRecipe(recipeId){
        const result =  await query(recipeQueries.getRecipe(recipeId))
        return result.recordsets;
    }

    async getRecipes(){
        const result =  await query(recipeQueries.getRecipes())
        return result.recordsets;
    }

    async getUserRecipes(userId){
        const result =  await query(recipeQueries.getUserRecipes(userId))
        return result.recordsets[0];
    }

    async getLikes(recipeId, userId){
        const result =  await query(recipeQueries.getLikes(recipeId, userId))
        //console.log(result.recordsets);
        return result.recordsets;
    }

    async addLike(recipeId, userId){
        const result =  await query(recipeQueries.addLike(recipeId, userId))
        //console.log(result.recordsets[0]);
        return result.recordsets[0];
    }

    async getUserRecipesBookmarks(userId){
        const result =  await query(recipeQueries.getUserRecipesBookmarks(userId))
        //console.log(result.recordsets[0]);
        return result.recordsets[0];
    }

    async addRecipeComment(userId, recipeId, comment){
        const result =  await query(recipeQueries.addRecipeComment(userId, recipeId, comment))
        //console.log(result.recordsets[0]);
        return result.recordsets[0];
    }

    async getRecipeComments(recipeId){
        const result =  await query(recipeQueries.getRecipeComments(recipeId))
        //console.log(result);
        return result.recordsets[0];
    }

    async deleteUserRecipeCommment(commentId){
        const result =  await query(recipeQueries.deleteUserRecipeCommment(commentId))
        console.log(result);
        return result.recordsets[0];
    }

    async searchRecipes(ingredientId, serchStr){
        if(serchStr == '0') serchStr = '';
        const result =  await query(recipeQueries.searchRecipes(ingredientId, serchStr))
        return result.recordsets;
    }

    async getRecipesTitles(){
        const result =  await query(recipeQueries.getRecipesTitles())
        return result.recordsets;
    }

    async deleteRecipe(recipeId){
        const result =  await query(recipeQueries.deleteRecipe(recipeId))
        //console.log(result.recordsets[0]);
        return result.recordsets[0];
    }
}

module.exports = new RecipeService();