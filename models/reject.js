const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const rejectSchema=new Schema({
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

const Reject=mongoose.model('reject',rejectSchema)
module.exports=Reject