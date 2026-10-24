

import mongoose from 'mongoose';
import Pet from '../schemas/pets.js';


class petsModel{

    async create(pet){
        return await Pet.create(pet)
    }

    async update(id, mascota){
        return await Pet.findOneAndUpdate({_id: new mongoose.Types.ObjectId(id)}, mascota);
    }

    async delete(id){
        
        return await Pet.findOneAndDelete({_id: new mongoose.Types.ObjectId(id)})
    }

    async getAll(){
        return await Pet.find();
    }

    async getOne(id){
        return await Pet.findById();
    }

}

export default new petsModel();