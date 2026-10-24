import usersModel from '../models/users.js'
import petsModel from '../models/pets.js'
import bcrypt from 'bcryptjs';
import jsonwebtoken from 'jsonwebtoken';
import { generarToken } from '../helpers/authentication.js';

class usersController{
    constructor(){

    }
    async register(req,res){
                try{
                    const { email, name, phone, password } = req.body;
    
                    const userExist = await usersModel.getOne({ email });
                    if(userExist){
                        return res.status(400).json({error: 'El usuario ya existe'});
                    }
                    //codifica la clave pass compara con el algoritmo de hash 
                     const claveEncriptada = await bcrypt.hash(password, 10);
                    
                    const data = await usersModel.create({
                        email,
                        name,
                        phone,
                        password: claveEncriptada
                    });
                    
    
                    res.status(201).json(data);
                }catch(e){
                    console.log(e)
                    res.status(500).send(e);
                }
        }
        async login(req,res){
           try{ 
            const { email, password } = req.body;
            const userExist = await usersModel.getOne({ email });
                //busca que el usuario y la contrasena existan
                if(!userExist || !await bcrypt.compare(password,userExist.password)){
                    return res.status(400).json({error: 'credenciales invalidas'});
                }
    
               // const claveValida = await bcrypt.compare(password,userExist.password )
               // if(!claveValida){
                //    return res.status(400).json({error: 'Clave no valida'})
               // }
               const token = generarToken(email);
                return res.status(200).json({msg: 'Usuario autenticado',token})
            } catch (e){   
                return res.status(500).json({ error: e.message });
            }     
        }
    async profile(req,res){
        try{
           // const { email } = req.params;
          // console.log(req.emailConectado)
            const data = await usersModel.getOne({ email: req.emailConectado })
            //res.status(201).json(data);
            const mascotas = await petsModel.getAll();
            console.log(data)
            console.log(mascotas)
            res.render('profile',{data,mascotas})
        }catch(e){
             res.status(500).send(e);
        }
    }
}

export default new usersController();