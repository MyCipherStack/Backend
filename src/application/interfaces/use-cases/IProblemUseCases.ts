import { Problem } from "../../../domain/entities/Problem.js";


export interface IAddProblemUseCase{
    execute(problem:Problem):Promise<Problem>
}

export interface IEditProblemUseCase{

    execute(id:string,problem:Problem):Promise<Problem |null>

}