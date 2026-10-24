import mongoose from "mongoose";

const petSchema =  new mongoose.Schema({
    name:{
        type: String,
        required:true
    }, 
    type: {
        type: String,
        required: true,
        enum:[
            'Dog', 'Cat','Hamster', 'Parrot','Spider','Goldfish'
        ],
    },
    breed: {
        type: String
    },
    age: {
        type:Number,
        min : [0, 'La edad no puede ser negativa'],
        max : [30,'La edad no parece correcta']
    }, 
    sex: {
        type:String
    }, 
    description: {
        type: String
    },
    adopt : {
        type: Boolean,
        default: false
    }
}, { timestamps : true }
);

export default mongoose.model('Pets', petSchema);