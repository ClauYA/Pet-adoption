import petsModel from '../models/pets.js'


class petsController{
    constructor(){

    }

    async create(req,res){
        try{
            const data = await petsModel.create(req.body);
            res.status(201).json(data);
        }catch(e){
            res.status(500).send(e);
        }
    }

    async update(req,res){
        try{
            const {id} = req.params;
            const data = await petsModel.update(id, req.body)
            res.status(200).json(data);
            
        }catch(e){
            res.status(500).send(e);
        }
    }

    async getOne(req,res){
        try{
            const { id } = req.params;
            const data = await petsModel.getOne(id)
            res.status(200).json(data);
        }catch(e){
            res.status(500).send(e);
        }
    }

    async getAll(req,res){
          
        try{
             const data = await petsModel.getAll();
            res.status(200).json(data);
           
        }catch(e){
            res.status(500).send(e.message);
        }
    }

    async delete(req,res){
        try{
            const {id} = req.params;
            const data = await petsModel.delete(id)
          
            res.status(200).json(data);
        }catch(e){
            res.status(500).send(e);
        }
    }
}

export default new petsController();