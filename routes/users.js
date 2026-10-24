import express from "express";
const route = express.Router();
import usersController from '../controllers/users.js'
import { verificarToken } from "../helpers/authentication.js";

route.post('/registro', usersController.register);
route.get('/signup',usersController.register);
route.post('/login', usersController.login);
route.get('/profile', verificarToken,usersController.profile);



export default route;