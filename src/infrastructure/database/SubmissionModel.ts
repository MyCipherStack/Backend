import mongoose, { Document, SchemaTypes, Types } from 'mongoose';

export interface ISubmissionDocument extends Document{
    userId:Types.ObjectId,
    problemId:Types.ObjectId,
    code:string,
    language:string,
    status:string,
    runTime:number,
    memory:number,
    failingTestCaseResult:{
        input:string,
        output:string,
        compile_output:string
    },
    passedTestCases:number,
    totalTestCases:number,
    error:string

    createdAt?:Date
    updatedAt?:Date
    _id:string

}

const submissionSchema = new mongoose.Schema<ISubmissionDocument>({

  userId: { type: SchemaTypes.ObjectId, ref: 'User', required: true },

  problemId: { type: SchemaTypes.ObjectId, ref: 'Problem', required: true },

  code: { type: String, required: true },

  language: { type: String, required: true },

  status: { type: String, enum: ['Accepted', 'Wrong Answer', 'Compilation Error', 'RunTime Error'], required: true },

  runTime: { type: Number },

  memory: { type: Number },

  failingTestCaseResult: {
    input: { type: String },
    output: { type: String },
    compile_output: { type: String },
  },

  passedTestCases: { type: Number, required: true },

  totalTestCases: { type: Number, required: true },

  error: { type: String },

}, { timestamps: true });

submissionSchema.index({ user: 1, createdAt: -1 });

export const submissionModel = mongoose.model<ISubmissionDocument>('submission', submissionSchema);
