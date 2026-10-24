import 'dotenv/config';
import jsonwebtoken from 'jsonwebtoken';

export function generarToken(email){
    return jsonwebtoken.sign({email}, process.env.JWT_TOKEN_SECRET, {expiresIn: '1h'});
}

export function verificarToken(req,res, next){
    //cambie como mandar el token en postman no recibe bearer
    const token = req.header('Authorization')?.replace('Bearer','').split(' ')[1].trim() || req.query?.token;
    
    console.log(req.query)
    console.log(token);
    if(!token){
        return res.status(401).json({error: 'Token requerido'});
    }

    try{
        const dataToken = jsonwebtoken.verify(token, process.env.JWT_TOKEN_SECRET);
        //console.log(dataToken.email);
        req.emailConectado = dataToken.email;
        //para avanzar y dar el siguiente middleware
        //problema
        next();
    }catch(e){
        console.log(e.message);
        res.status(401).json({error: 'Token no valido'});
    }
   
}