const Router = require('express').Router
const recipeController = require('../controllers/recipe.controller')

const authMiddleware = require('../middleware/authMiddleware')
//const adminMiddleware = require('../middleware/adminMiddleware')

const router = new Router();

router.post('/create', authMiddleware, recipeController.createRecipe);
router.post('/get', recipeController.getRecipe);
router.get('/get/recipes', recipeController.getRecipes);
router.get('/user', authMiddleware, recipeController.getUserRecipes);
router.post('/likes', recipeController.getLikes);
router.post('/add/like', authMiddleware , recipeController.addLike);
router.get('/bookmarks', authMiddleware , recipeController.getUserRecipesBookmarks);
router.post('/add/comment', authMiddleware , recipeController.addRecipeComment);
router.post('/get/comments', recipeController.getRecipeComments);
router.post('/delete/comment', authMiddleware, recipeController.deleteUserRecipeCommment);
router.post('/search', recipeController.searchRecipes);
router.post('/delete', authMiddleware , recipeController.deleteRecipe);

module.exports = router;