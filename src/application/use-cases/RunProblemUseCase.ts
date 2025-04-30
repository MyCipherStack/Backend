import { IJuge0CodeExecute } from "../../domain/services/IJuge0CodeExecute.js";
import { ITestCase } from "../interfaces/ITestCase.js";
import { IRunProblemUseCase } from "../interfaces/use-cases/IProblemUseCases.js";

export class RunProblemUseCase implements IRunProblemUseCase {
    constructor(
        private juge0CodeExecute:IJuge0CodeExecute
    ){}
    async execute(testCases: ITestCase[],code:string,language:string,memoryLimit:number,timeLimit:number,functionSignatureMeta:{},stopFailTestCase:boolean): Promise<ITestCase[]> {
        const result:ITestCase[]=[]
        for(let test of testCases){
            console.log(test);
            
            const updatedTestCases={...test}
            const token= await this.juge0CodeExecute.codeSubmitToJudge0(language,code,test.input,test.output,memoryLimit,timeLimit,functionSignatureMeta)
            if(!token){
                updatedTestCases.error="Compailation Error"
                updatedTestCases.status=false
                result.push(updatedTestCases)
                console.log("1break");

                break;
            } 
            const response= await this.juge0CodeExecute.getResultFromJudge0(token)
            if(response.output){

                const match =response.output.match(/([\s\S]*?)__RESULT__:(.*)/);
                
                const logOut = match ? match[1].trim() : '';      
                const actualOutput = match && match[2] ? match[2].trim() : '';  
                const status = test.output.trim() == actualOutput;
                
                updatedTestCases.status=status   //accept or not 
                updatedTestCases.logOut=logOut
                updatedTestCases.compile_output=actualOutput
                if(!status && stopFailTestCase){

                 result.push(updatedTestCases)
                 console.log("2break");
                 
                    
                    break
                } 
                
                
            }else{
                
                updatedTestCases.status=false
                updatedTestCases.error=response.error
                if(stopFailTestCase){
                 console.log("3break");
                    
                result.push(updatedTestCases)

                    break
                } 
            }

            result.push(updatedTestCases)
            
        }
        return result
    }
}