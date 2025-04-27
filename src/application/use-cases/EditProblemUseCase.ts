
import { Problem } from "../../domain/entities/Problem.js";
import { IProblemRepository } from "../../domain/repositories/IProblemRepository.js";




export class EditProblemUseCase{
    constructor(
        private problemRespository:IProblemRepository
    ){}

 async   execute(id:string,problem:Problem){
    console.log("Add probleusecase");
    
        const data= await this.problemRespository.editProblem(id,problem)
        return data
    }   

}       