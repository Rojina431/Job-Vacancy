const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const jobSchema=new Schema({
    userFrom:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
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

const Job=mongoose.model('job',jobSchema)
module.exports=Job