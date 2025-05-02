import { Problem } from "../../domain/entities/Problem.js";
import { IProblemRepository } from "../../domain/repositories/IProblemRepository.js";
import { problemModel } from "../database/ProblemModel.js";



export class ProblemRepository implements IProblemRepository {

  async  create(problem: Problem): Promise<Problem> {
        const created=await problemModel.create(problem)
        return created
    }

  async findById(Id: string): Promise<Problem | null> {
    const problem=await problemModel.findById(Id).lean()
    if(!problem) return null
    return problem
  }
  
  async getFilterProblem(filters: { page: number;limit:number, difficulty?: string; status?: string; search?: string; category?: string; }): Promise<{ problems: any[]; totalProblems: number; totalPages: number; }> {
    let   query:any={}
    if(filters.difficulty){
        query.difficulty=filters.difficulty
    }
    if(filters.status) query.status=filters.status
    if(filters.category) query.tags=`${filters.category}`
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
        return problemData
      }return null
    }

// async changeStatus(id: string, status: boolean): Promise<Problem | null> {
    
//   const problemData=await problemModel.findOneAndUpdate({_id:id},{status:status},{new:true})
//   if(problemData){
//     return problemData
//   }return null

// }

  }
  