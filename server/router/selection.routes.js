const Router = require('express').Router
const selectionController = require('../controllers/selection.controller')

const authMiddleware = require('../middleware/authMiddleware')
//const adminMiddleware = require('../middleware/adminMiddleware')

const router = new Router();

//router.post('/create/ingredient', authMiddleware, recipeController.createRecipe);
router.post('/create', authMiddleware, selectionController.createSelection);
router.get('/get', selectionController.getSelections);
router.post('/getOne', selectionController.getSelection);
router.post('/getLikes', selectionController.getLikes);
router.post('/add/like', authMiddleware, selectionController.addLike);
router.get('/getSelections', authMiddleware, selectionController.getUserSelections);
router.get('/bookmarks', authMiddleware, selectionController.getUserSelectionsBookmarks);
router.post('/delete', authMiddleware , selectionController.deleteSelection);

module.exports = router;