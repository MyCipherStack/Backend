import { BaseRepository } from "../../infrastructure/repositories/BaseRespositroy.js";
import { Problem } from "../entities/Problem.js";
import { IBaseRepository } from "./IBaseRepository.js";



export interface IProblemRepository extends IBaseRepository<Problem>{
    // create(problem:Problem):Promise<Problem>
    getFilterProblem(filters:{page:number,limit:number,difficulty?: string,status?: string, search?: string,category:string }):Promise<{problems:any[],
        totalProblems: number,totalPages: number}>

    editProblem(id:string,problem:Problem):Promise<Problem | null>

    // changeStatus(id:string,status:boolean):Promise<Problem | null>



}