import 'dotenv/config';
import express from 'express';
import routesPets from './routes/pets.js';
import routesUsers from './routes/users.js';
import routesAuth from './routes/auth.js';
import routesHomepage from './routes/homepage.js';

import bodyParser from 'body-parser';
import dbClient from './config/dbClient.js';
import path from 'path';

const app = express();
//se agrega esto por estoy usando module ES 
//necesito agregarlo pero en commonjs no necesito agregar esto
const __dirname = import.meta.dirname

//gestiona middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true}));

app.set('view engine' , 'ejs')
//aca es donde usamos el dir q es para modules especificamente
app.set('views', path.join(__dirname, 'views'))

app.use('/pets', routesPets);
app.use('/users', routesUsers);
app.use('/auth', routesAuth);
app.use('/',routesHomepage);

//agregue esto para que lea mi public folder
app.use(express.static(path.join(__dirname, 'public')))


try{
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => 
    console.log('Server in the port ' + PORT))
}catch(e){
    console.log(e);
}
process.on('SIGINT', async () =>{
    dbClient.cerrarConexion();
    process.exit(0);
});