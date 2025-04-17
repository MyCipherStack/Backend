import { Problem } from "../entities/Problem.js";



export interface IProblemRepository{
    create(problem:Problem):Promise<Problem>
    getFilterProblem(filters:{page:number,limit:number,difficulty?: string,status?: string, search?: string,category:string }):Promise<{problems:any[],
        totalProblems: number,totalPages: number}>

}