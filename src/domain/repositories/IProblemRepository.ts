import { Problem } from "../entities/Problem.js";
import { IBaseRepository } from "./IBaseRepository.js";



export interface IProblemRepository extends IBaseRepository<Problem> {

    getFilterProblem(filters: { page: number, limit: number, difficulty?: string, status?: string, search?: string, category: string }): Promise<{
        problems:Problem[],
        totalProblems: number, totalPages: number
    }>

    editProblem(id: string, problem: Problem): Promise<Problem | null>

    findByTittle(title: string): Promise<Problem | null>

    getRadomDocument(): Promise<Problem | null>

    // changeStatus(id:string,status:boolean):Promise<Problem | null>

    updateAcceptance(id: string, submitted: number, accepted: number): Promise<boolean>

    totalProblemsDifficulty(): Promise<{ difficulty: string; count: number }[]>




}