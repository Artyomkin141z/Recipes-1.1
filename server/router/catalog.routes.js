const Router = require('express').Router
const recipeController = require('../controllers/recipe.controller')

const authMiddleware = require('../middleware/authMiddleware')
//const adminMiddleware = require('../middleware/adminMiddleware')

const router = new Router();

//router.post('/create/ingredient', authMiddleware, recipeController.createRecipe);
router.post('/create/ingredient', authMiddleware, recipeController.createIngredient);
router.get('/get/ingredients', authMiddleware, recipeController.getIngredients);
router.get('/get/recipes', authMiddleware, recipeController.getRecipesTitles);


module.exports = router;