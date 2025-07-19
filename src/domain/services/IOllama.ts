import { IProblem } from "@/infrastructure/database/ProblemModel"
import { Problem } from "../entities/Problem"



export interface ISendToOllama{
    
    generateResponse(prompt: string): Promise<string> 

}


export interface IGeneratePrompt{

        createSolutionPrompt(problemDetails:Problem,language:string): string


}