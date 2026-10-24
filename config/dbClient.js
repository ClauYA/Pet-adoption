import 'dotenv/config';
import { MongoClient } from "mongodb";
import mongoose from 'mongoose';

class dbClient{
    constructor(){
        this.conectarBD();
    }
    async conectarBD(){
        const queryString = `mongodb+srv://${process.env.USER_DB}:${process.env.PASS_DB}@${process.env.SERVER_DB}/adoption`;
        //cambiando mongodb por mongoose
        //this.client = new MongoClient(queryString);
        await mongoose.connect(queryString);
        console.log('conectado a la BD mongoose ^^')
        //this.connectBD();
    }
    //this was part of mongodb it is not need any more for
    //mongoose
    /*async connectBD(){
        try{
            await this.client.connect();
            this.db = this.client.db('adoption');
            console.log('Conecctado a la BD')
        } catch (e){
            console.log(e);
        }
    }*/
   async cerrarConexion(){
    try{
        await mongoose.disconnect();
        console.log("Conexion a la BD cerrada")
    }catch(e){
        console.error('Error al cerrar la conexion', e)
    }
   }
}
export default new dbClient();