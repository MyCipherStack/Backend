import { ObjectId } from "mongoose";
import { Submission } from "../../domain/entities/Submission.js";
import { ISubmissionRepository } from "../../domain/repositories/ISubmissionRepository.js";
import { submissionModel } from "../database/SubmissionModel.js";




export class SubmissionRepository implements ISubmissionRepository{

    async create(data: Submission): Promise<Submission> {
    const res=await submissionModel.create({userId:data.userId,problemId:data.problemId,
        code:data.code,language:data.language,memory:data.memory,totalTestCases:data.totalTestCases,error:data.error,
        runTime:data.runTime,status:data.status,passedTestCases:data.passedTestCases,failingTestCaseResult:data.failingTestCaseResult})
       return  new Submission(res.userId as string,res.problemId as string,res.code,res.language,res.status,res.runTime  ?? 0,res.memory ?? 0,res.passedTestCases,res.totalTestCases,res.error ?? "" ,res.failingTestCaseResult,res.createdAt.toString() )
        
    }


    async findById(id: string): Promise<Submission | null> {
    const res=await submissionModel.findById(id).lean()
    if(!res) return null
    return  new Submission(res.userId as string,res.problemId as string,res.code,res.language,res.status,res.runTime  ?? 0,res.memory ?? 0,res.passedTestCases,res.totalTestCases,res.error ?? "",res.failingTestCaseResult,res.createdAt.toString() )
    }

    async getSubmissionsByProblem(userId:string,problemId: string): Promise<Submission[]> {
        const res=await submissionModel.find({userId,problemId})
        return res                                                    
    }



}
