import { Document } from "mongoose";
import { Problem } from "../../domain/entities/Problem.js";
import { IProblemRepository } from "../../domain/repositories/IProblemRepository.js";
import { IProblem, problemModel } from "../database/ProblemModel.js";
import { BaseRepository } from "./BaseRespositroy.js";
import e from "express";



export class ProblemRepository extends BaseRepository<Problem,IProblem> implements IProblemRepository {

  
  // async  create(problem: Problem): Promise<Problem> {
  //   const created=await problemModel.create(problem)
  //   return created
  // }
  

  
  // async findById(Id: string): Promise<Problem | null> {
  //   const problem=await problemModel.findById(Id).lean()
  //   if(!problem) return null
  //   return problem
  // }
  
  async getFilterProblem(filters: { page: number;limit:number, difficulty?: string; status?: string; search?: string; category?: string; }): Promise<{ problems: any[]; totalProblems: number; totalPages: number; }> {
    let   query:any={}
    if(filters.difficulty){
        query.difficulty=filters.difficulty
    }
    if(filters.status) query.status=filters.status
    // if(filters.category) query.tags=`${filters.category}`
    if(filters.category) query.tags={$regex:new RegExp(`\\b${filters.category}\\b`,'i')}
    if(filters.search){
        query.$or=[
            {title:{$regex:filters.search,$options:"i"}},
            {tags:{$regex:filters.search,$options:"i"}},
        ]

    }
    const skip=(filters.page-1)*filters.limit
    const totalProblems = await problemModel.countDocuments(query);
    const totalPages = Math.ceil(totalProblems / filters.limit);
    const problems= await problemModel.find(query).skip(skip).limit(filters.limit).lean()
    return {problems,totalProblems,totalPages}
}

 async  editProblem(id: string, problem: Problem): Promise<Problem | null> {
      const problemData=await problemModel.findOneAndUpdate({_id:id},{...problem},{new:true})
      if(problemData){
        return this.toEntity(problemData)
      }return null
    }

    protected toEntity(data: (IProblem & Document<unknown, any, any>) | null): Problem | null {
      if(!data) return null
      return new Problem(
        data.title,
        data.problemId,
        data.difficulty,
        data.timeLimit,
        data.memoryLimit,
        data.tags,
        data.statement,
        data.inputFormat,
        data.outputFormat,
        data.constraints,data.testCases,
        data.functionSignatureMeta,
        data.id
      )
    }





// async changeStatus(id: string, status: boolean): Promise<Problem | null> {
    
//   const problemData=await problemModel.findOneAndUpdate({_id:id},{status:status},{new:true})
//   if(problemData){
//     return problemData
//   }return null

// }

  }
  