
import { Problem } from "../../domain/entities/Problem.js";
import { IProblemRepository } from "../../domain/repositories/IProblemRepository.js";
import { IEditProblemUseCase } from "../interfaces/use-cases/IProblemUseCases.js";




export class EditProblemUseCase implements IEditProblemUseCase{
    constructor(
        private problemRespository:IProblemRepository
    ){}

 async   execute(id:string,problem:Problem){ 
        const data= await this.problemRespository.editProblem(id,problem)
        return data
    }   

}       