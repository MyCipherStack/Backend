import mongoose, { Types } from "mongoose";




const submissionSchema=new mongoose.Schema({

    user:{type:Types.ObjectId,ref:"User",required:true},

    problem:{type:Types.ObjectId,ref:"Problem",required:true},

    code:{type:String,required:true},

    language:{type:String,required:true},

    status:{type:String,enum:["Accepted","Wrong Answer","Compilation Error","RunTime Error"],required:true},

    runTime:{type:Number},

    memory:{type:Number},

    failingTestCaseResult:{
        input:{type:String},
        output:{type:String},
        compile_output:{type:String}
    },

    passedTestCases:{type:Number,required:true},


},{timestamps:true})

submissionSchema.index({user:1,createdAt:-1})


export const submissionModel=mongoose.model("submission",submissionSchema)