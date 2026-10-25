import petsModel from '../models/pets.js'
//cambiar esto por una mejor API que busque a todos los animale
//aca manda la imagen random de perros 
async function randomDogImage() {
        try {
            const res = await fetch('https://dog.ceo/api/breeds/image/random', {
            signal: AbortSignal.timeout(4000)
            })
            if (!res.ok) return null
            const data = await res.json()
            return data.status === 'success' ? data.message : null
            } catch {
                return null
        }
    }
    
    class petsController{
    constructor(){

    }
   
    async create(req,res){
        try{
            const pet = { ...req.body }
            pet.image = await randomDogImage() || '/public/img/dogi.jpg'
            const data = await petsModel.create(pet);
            res.status(201).json(data);
        }catch(e){
            res.status(500).json({ error: e.message });
        }
    }

    async update(req,res){
        try{
            const {id} = req.params;
            const data = await petsModel.update(id, req.body)
            if (!data) return res.status(404).json({ error: 'Pet not found' })
            res.status(200).json(data);
            
        }catch(e){
            res.status(500).json({ error: e.message });
        }
    }

    async getOne(req,res){
        try{
            const { id } = req.params;
            const data = await petsModel.getOne(id)
            res.status(200).json(data);
        }catch(e){
            res.status(500).json({ error: e.message });
        }
    }

    async getAll(req,res){
          
        try{
             const data = await petsModel.getAll();
            res.status(200).json(data);
           
        }catch(e){
            res.status(500).json({ error: e.message });
        }
    }

    async delete(req,res){
        try{
            const {id} = req.params;
            const data = await petsModel.delete(id)
          
            res.status(200).json(data);
        }catch(e){
            res.status(500).json({ error: e.message });
        }
    }
}

export default new petsController();