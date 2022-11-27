const Router = require('express').Router
const userController = require('../controllers/user.controller')

const authMiddleware = require('../middleware/authMiddleware')
//const adminMiddleware = require('../middleware/adminMiddleware')

const router = new Router();

router.post('/registration', userController.registartion);
router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.get('/refresh', userController.refresh);

router.get('/users', authMiddleware, userController.getUsers);
router.post('/user/userInform', authMiddleware, userController.getUserInform);

module.exports = router;