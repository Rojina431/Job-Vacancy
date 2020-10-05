const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const acceptSchema=new Schema({
    userFrom:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Candidate'
    }],
    CompanyName:{
        type:String,
      },
    name:{
        type:String,
        
    },
    jobRole:{
        type:String,
        
    },
     Salary:{
         type:String,
     },
     jobId:{
         type:String,
     },
     number:{
         type:String
     }
}
,
  { timeStamps:true}
  
  );

const Accept=mongoose.model('accept',acceptSchema)
module.exports=Accept