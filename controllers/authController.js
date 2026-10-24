import usersModel from '../models/users.js'
import bcrypt from 'bcryptjs';
import jsonwebtoken from 'jsonwebtoken';
import { generarToken } from '../helpers/authentication.js';

class AuthController{
    login(req, res) {
        res.render('login')
    }
    signup(req, res) {
        res.render('signup')
    }
   
}

export default new AuthController();