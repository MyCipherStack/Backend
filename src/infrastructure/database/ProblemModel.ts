import mongoose, { Schema } from "mongoose";




export interface IProblem extends Document {
    title: string;
    problemId: string;
    difficulty: string;
    timeLimit: number;
    memoryLimit: number;
    isPremium: boolean;
    tags: string;
    statement: string;
    inputFormat: string;
    outputFormat: string;
    constraints: string;
    hint:string;

    testCases: ITestCase[];
    functionSignatureMeta:{
      name:{type:String},
      parameters:{name: string,
        type: string},
      returnType:{type:string}},
    starterCode:{},
    status:boolean
  }
  
  const TestCaseSchema: Schema = new Schema({
    input: { type: String, required: true },
    output: { type: String, required: true },
    isSample: { type: Boolean, default: false },
    explanation:{ type: String }
  });
  

  export interface ITestCase {
    input: string;
    output: string;
    isSample: boolean;
  }

const problemsSchema=new Schema({

        title:{ type:String, required:true},

        difficulty: {  type: String,required: true },

        timeLimit: { type: Number, default: 1000 },

        memoryLimit: { type: Number, default: 128 },

        isPremium: { type: Boolean, default: false },

        tags: { type: String },

        statement: { type: String, required: true },

        inputFormat: { type: String, required: true },
        
        outputFormat: { type: String, required: true },

        constraints: { type: String, required: true },

        hint:{type:String},

        testCases: { type: [TestCaseSchema], default: [] },
        
        acceptence:{type:Number,default:100},

        functionSignatureMeta:{
            name:{type:String},
            parameters:{type:Array},
            returnType:{type:String}},

        starterCode:{type:Object},

        status:{type:Boolean,default:true}
        
    },{timestamps:true}

)

export const problemModel=mongoose.model<IProblem>("problem",problemsSchema)