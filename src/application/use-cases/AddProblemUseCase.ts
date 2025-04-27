import { Problem } from "../../domain/entities/Problem.js";
import { IProblemRepository } from "../../domain/repositories/IProblemRepository.js";




export class AddProblemUseCase{
    constructor(
        private problemRespository:IProblemRepository
    ){}

 async   execute(problem:Problem){
    console.log("Add probleusecase");
    
        const data= await this.problemRespository.create(problem)
        return data
    }   

}                                                                                                                                                                                           