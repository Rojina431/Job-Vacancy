const mongoose = require('mongoose');

const candidateSchema = mongoose.Schema({
    name:{
        type:String,
        
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String
    },
    register_date:{
        type:Date,
        default:Date.now
    }
}
)


const Candidate = mongoose.model('Candidate', candidateSchema);

module.exports =  Candidate