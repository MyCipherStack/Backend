import { Problem } from "../../domain/entities/Problem";
import { IProblemRepository } from "../../domain/repositories/IProblemRepository";
import { IAddProblemUseCase } from "../interfaces/use-cases/IProblemUseCases";




export class AddProblemUseCase implements IAddProblemUseCase{
    constructor(
        private problemRespository:IProblemRepository
    ){}

 async   execute(problem:Problem){
    console.log("Add probleusecase");
    
        const data= await this.problemRespository.create(problem)
        return data
    }   

}                                                                                                                                                                                           