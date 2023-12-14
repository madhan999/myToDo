const router = require('express').Router;
const authRouter = router();
const signupController = require('../controllers/auth/signup')
const loginController = require('../controllers/auth/login')
const {validateSchema, signUpSchema, loginSchema} = require('../middlewares/joi.middleware')
authRouter.post('/auth/signup', validateSchema(signUpSchema,'user'),signupController)
authRouter.post('/auth/login', validateSchema(loginSchema,'user'),loginController)
module.exports = authRouter

