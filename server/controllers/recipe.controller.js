const RecipeService= require('../service/recipe.service')
const tokenService = require('../service/token.service')

class RecipeController {
    async createRecipe(req, res, next){
        try{
            const data = req.body;
            const {id} = tokenService.validateAccessToken(data.token);
            //console.log('data.token', tokenService.validateAccessToken(data.token))
            const {name, content, time, energyValue, ingredients, steps, advice} = req.body.recipe;
            //console.log(ingredients.ingredients);
            const result = await RecipeService.create(id, name, content, ingredients.numberServings, time);
            const recipeId = result[0].id;
            const userId = result[0].user_id;
            //console.log(result[0])
            if(advice) await RecipeService.createAdvice(recipeId, advice);
            if(steps.length) await RecipeService.addSteps(recipeId, steps);
            if(advice) await RecipeService.addEnergyValue(recipeId, energyValue)
            if(ingredients.ingredients) await RecipeService.addIngredients(recipeId, ingredients.ingredients)
            //const recipe = await RecipeService.getRecipe(recipeId);
            //console.log(recipe);
            return res.json({recipeId: recipeId, userId: userId});
        }catch(e){
            next(e);
        }

    }  
    
    async createIngredient(req, res, next){
        try{
            const {ingredient} = req.body;
            console.log(ingredient);
            const result = await RecipeService.createIngredient(ingredient);
            console.log(result);
            return res.json({ingredients: result});
        }catch(e){
            next(e);
        }
    }

    async getIngredients(req, res, next){
        try{
            //console.log('Ищем ингредиенты')
            const result = await RecipeService.getIngredients();
            //console.log(result);
            return res.json({ingredients: result});
        }catch(e){
            next(e);
        }
    }

    async getRecipe(req, res, next){
        try{
            const {id, token} = req.body;
            const validToken = tokenService.validateAccessToken(token);
            const userId = validToken.id;
            
            console.log(userId)
            const recipe = await RecipeService.getRecipe(id);
            let isMy = false;
            if(userId == recipe[0][0].user_id){
                isMy = true;
            }

            const result = {
                isMy: isMy,
                recipeId: recipe[0][0].id,
                name: recipe[0][0].title,
                img: recipe[0][0].img,
                author: recipe[0][0].user_id,
                categories: recipe[2],
                content: recipe[0][0].content,
                time: recipe[0][0].time,
                energyValue: {
                    calories: recipe[3][0].calories,
                    proteins: recipe[3][0].proteins,
                    fats: recipe[3][0].fats,
                    carbohydrates: recipe[3][0].carbohydrates
                }, 
                ingredients: {
                    numberServings: recipe[0][0].numbers_servings,
                    ingredients: recipe[5]
                },
                steps: recipe[6],
                advice: recipe[1][0].advice,
                feedback: recipe[4]
            }
            //console.log(result);
            return res.json({recipe: result});
        }catch(e){
            next(e);
        }
    }

    async getRecipes(req, res, next){
        try{
            //console.log('Ищем ингредиенты')
            const result = await RecipeService.getRecipes();
            console.log(result);
            return res.json({recipes: result});
        }catch(e){
            next(e);
        }
    }

    async getUserRecipes(req, res, next){
        try{
            const token = req.headers.authorization.split(' ')[1];
            const validToken = tokenService.validateAccessToken(token);
            const userId = validToken.id;
            //console.log('Ищем ингредиенты')
            const result = await RecipeService.getUserRecipes(userId);
            //console.log(result);
            return res.json({recipes: result});
        }catch(e){
            next(e);
        }
    }

    async getLikes(req, res, next){
        try{
            const token = req.headers.authorization.split(' ')[1];
            const validToken = tokenService.validateAccessToken(token);
            const userId = validToken.id;
            const {recipeId} = req.body;
            console.log('userId:', userId)
            console.log('recipeId:', recipeId)
            //console.log('Ищем ингредиенты')
            const result = await RecipeService.getLikes(recipeId, userId);
            console.log(result);
            return res.json({numberLikes: result[0][0].numberLikes, isLikes: result[1][0].isLikes});
        }catch(e){
            next(e);
        }
    }

    async addLike(req, res, next){
        try{
            const token = req.headers.authorization.split(' ')[1];
            const validToken = tokenService.validateAccessToken(token);
            const userId = validToken.id;
            const {recipeId} = req.body;

            const result = await RecipeService.addLike(recipeId, userId);
            
            //console.log('numberLikes:', result[0][0].numberLikes, 'isLikes:', result[1][0].isLikes);
            //return res.json({numberLikes: result[0][0].numberLikes, isLikes: result[1][0].isLikes});
        }catch(e){
            next(e);
        }
    }

    async getUserRecipesBookmarks(req, res, next){
        try{
            const token = req.headers.authorization.split(' ')[1];
            const validToken = tokenService.validateAccessToken(token);
            const userId = validToken.id;

            const result = await RecipeService.getUserRecipesBookmarks(userId);

            return res.json({recipes: result});
        }catch(e){
            next(e);
        }
    }

    async addRecipeComment(req, res, next){
        try{
            const token = req.headers.authorization.split(' ')[1];
            const validToken = tokenService.validateAccessToken(token);
            const userId = validToken.id;

            const comment = req.body.comment;
            const recipeId = req.body.recipeId
            //console.log(comment)
            const result = await RecipeService.addRecipeComment(userId, recipeId, comment);
            //console.log(result)
            return res.json({comments: result});
        }catch(e){
            next(e);
        }
    }

    async getRecipeComments(req, res, next){
        try{
            const recipeId = req.body.recipeId
            //console.log(comment)
            const result = await RecipeService.getRecipeComments(recipeId);
            //console.log(result)
            return res.json({comments: result});
        }catch(e){
            next(e);
        }
    }
}

module.exports = new RecipeController();