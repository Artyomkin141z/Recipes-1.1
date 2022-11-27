class RecipeRequests {
    create(userId, title, content, nServings, time){
        return `EXEC createRecipe ${userId}, '${title}', '${content}', ${nServings}, ${time}`
    }

    addSteps(recipeId, steps){
        let str = 'INSERT INTO recipes_steps VALUES'
        for(let i = 0; i < steps.length; i++){
            str += ` (${recipeId}, ${steps[i].key}, '${steps[i].content}', NULL),`
        }
        str = str.slice(0, -1)
        //console.log(str);
        return str
    }

    addIngredients(recipeId, ingredients){
        let str = '';
        for(let i = 0; i < ingredients.length; i++){
            str += `EXEC addIngredient ${recipeId}, ${ingredients[i].id}, ${ingredients[i].gramms}; `
        }
        return str
    }

    addAdvice(recipeId, advice){
        return `EXEC addAdvice ${recipeId}, '${advice}'`
    }

    addEnergyValue(recipeId, energyValue){
        return `exec addEnergyValue ${recipeId}, ${energyValue.calories}, ${energyValue.proteins}, ${energyValue.fats}, ${energyValue.carbohydrates}`
    }

    createIngredient(ingredient){
        return `EXEC createIngredient '${ingredient}'`
    }

    getIngredients(){
        return `SELECT * FROM catalog_ingredients`
    }

    getRecipe(recipeId){
        return `EXEC getRecipe ${recipeId}`;
    }

    getRecipes(){
        return `EXEC getRecipes`
    }

    getUserRecipes(userId){
        return `exec getUserRecipesProc ${userId}`
    }

    getLikes(recipeId, userId){
        console.log(`exec getLikesRecipe '${recipeId}', '${userId}'`)
        if(userId) return `exec getLikesRecipe '${recipeId}', '${userId}'`;
        else return `exec getLikesRecipe '${recipeId}'`;
    }

    addLike(recipeId, userId){
        return `exec addLike '${recipeId}', '${userId}'`;
    }

    getUserRecipesBookmarks(userId = 0){
        return `exec getUserRecipesBookmarks ${userId}`;
    }

    addRecipeComment(userId, recipeId, comment){
        return `exec addRecipeComment ${recipeId}, ${userId}, ${comment}`
    }

    getRecipeComments(recipeId){
        return `exec getRecipeComments ${recipeId}`
    }
}

module.exports = new RecipeRequests();