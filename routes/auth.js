import express from 'express'
import authController from '../controllers/authController.js'

const route = express.Router()

route.get('/login', authController.login);
route.get('/signup', authController.signup);

export default route;