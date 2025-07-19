import { Document } from "mongoose";
import { Problem } from "../../domain/entities/Problem";
import { IProblemRepository } from "../../domain/repositories/IProblemRepository";
import { IProblem, problemModel } from "../database/ProblemModel";
import { BaseRepository } from "./BaseRespositroy";
import { logger } from "@/logger";




export class ProblemRepository extends BaseRepository<Problem, IProblem> implements IProblemRepository {



  constructor() {
    super(problemModel)
  }

  async getFilterProblem(filters: { page: number; limit: number, difficulty?: string; status?: string; search?: string; category?: string; }): Promise<{ problems: any[]; totalProblems: number; totalPages: number; }> {
    let query: any = {}
    if (filters.difficulty) {
      query.difficulty = filters.difficulty
    }
    if (filters.status) query.status = filters.status

    if (filters.category) query.tags = { $regex: new RegExp(`\\b${filters.category}\\b`, 'i') }
    if (filters.search) {
      query.$or = [
        { title: { $regex: filters.search, $options: "i" } },
        { tags: { $regex: filters.search, $options: "i" } },
      ]

    }
    const skip = (filters.page - 1) * filters.limit
    const totalProblems = await problemModel.countDocuments(query);
    const totalPages = Math.ceil(totalProblems / filters.limit);
    const problems = await problemModel.find(query).skip(skip).limit(filters.limit).lean()
    return { problems, totalProblems, totalPages }
  }

  async editProblem(id: string, problem: Problem): Promise<Problem | null> {

    const problemData = await problemModel.findOneAndUpdate({ _id: id }, { ...problem }, { new: true })

    if (problemData) {

      return this.toEntity(problemData)
    }
     return null
  }





  async getRadomDocument(): Promise<Problem | null> {

    const data = await problemModel.aggregate([{ $match: { status: false } }, { $sample: { size: 1 } }])

    return this.toEntity(data[0])
  }



  async updateAcceptence(id: string, submited: number, accepted: number): Promise<boolean> {

    const data = await problemModel.updateOne({ _id: id }, { $inc: { "acceptence.submited": submited, "acceptence.accepted": accepted } })

    logger.info("update Acceptence", { data })
    
    return data.modifiedCount > 0


  }






  protected toEntity(data: (IProblem & Document<unknown, any, any>) | null): Problem | null {
    if (!data) return null
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
      data.constraints, data.testCases,
      data.functionSignatureMeta,
      data.acceptence,
      data.hint,
      data.starterCode,
      data.id,
    )
  }


  async findBytitle(title: string): Promise<Problem | null> {
    const problemData = await problemModel.findOne({ title })

    if (problemData) {

      return this.toEntity(problemData)

    } return null

  }


  // async changeStatus(id: string, status: boolean): Promise<Problem | null> {

  //   const problemData=await problemModel.findOneAndUpdate({_id:id},{status:status},{new:true})
  //   if(problemData){
  //     return problemData
  //   }return null

  // }

}
