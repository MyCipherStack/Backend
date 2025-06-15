import { Document, ObjectId } from "mongoose";
import { Submission } from "../../domain/entities/Submission";
import { ISubmissionRepository } from "../../domain/repositories/ISubmissionRepository";
import { ISubmissionDocument, submissionModel } from "../database/SubmissionModel";
import { BaseRepository } from "./BaseRespositroy";









export class SubmissionRepository extends BaseRepository<Submission,ISubmissionDocument> implements ISubmissionRepository{

    // async create(data: Submission): Promise<Submission> {
    // const res=await submissionModel.create({userId:data.userId,problemId:data.problemId,
    //     code:data.code,language:data.language,memory:data.memory,totalTestCases:data.totalTestCases,error:data.error,
    //     runTime:data.runTime,status:data.status,passedTestCases:data.passedTestCases,failingTestCaseResult:data.failingTestCaseResult})
    //    return  new Submission(res.userId as string,res.problemId as string,res.code,res.language,res.status,res.runTime  ?? 0,res.memory ?? 0,res.passedTestCases,res.totalTestCases,res.error ?? "" ,res.failingTestCaseResult,res.createdAt.toString(),res._id.toString() )
        
    // }

    
    // async findById(id: string): Promise<Submission | null> {
        // const res=await submissionModel.findById(id).lean()
        // if(!res) return null
        // return  new Submission(res.userId.toString(),res.problemId.toString(),res.code,res.language,res.status,res.runTime  ?? 0,res.memory ?? 0,res.passedTestCases,res.totalTestCases,res.error ?? "",res.failingTestCaseResult,res.createdAt.toString(),res._id.toString() )
        // }
        
        constructor(){
            super(submissionModel)
        }
        async getSubmissionsByProblem(userId:string,problemId: string): Promise<Submission[]> {
            const res=await submissionModel.find({userId,problemId})
            return res.map(doc=>this.toEntity(doc)).filter(doc=>doc!=null)                                                 
        }
        
        
        
        protected toEntity(data: (ISubmissionDocument & Document<unknown, any, any>) | null): Submission | null {
            if(!data) return null
        return  new Submission(data.userId.toString(),data.problemId.toString(),data.code,data.language,data.status,data.runTime  ?? 0,data.memory ?? 0,data.passedTestCases,data.totalTestCases,data.error ?? "" ,data.failingTestCaseResult,data.createdAt?.toString(),data._id.toString() )
    
        }
}
