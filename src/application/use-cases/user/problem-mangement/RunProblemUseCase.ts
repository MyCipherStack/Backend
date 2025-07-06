import { IJuge0CodeExecute } from "@/domain/services/IJudge0CodeExecute"; 
import { ITestCase } from "@/application/interfaces/ITestCase"; 
import { IRunProblemUseCase } from "@/application/interfaces/use-cases/IProblemUseCases"; 
import { logger } from "@/logger";

export class RunProblemUseCase implements IRunProblemUseCase {
    constructor(
        private juge0CodeExecute:IJuge0CodeExecute
    ){}
    async execute(testCases: ITestCase[],code:string,language:string,memoryLimit:number,timeLimit:number,functionSignatureMeta:{},stopFailTestCase:boolean): Promise<ITestCase[]> {
        let result:ITestCase[]=[]

        // logger.info("testCase",{testCases})
        
        for(let test of testCases){
            
            const updatedTestCases={...test}

            // logger.info("testcaseForRun",{updatedTestCases})
            
            const token= await this.juge0CodeExecute.codeSubmitToJudge0(language,code,test.input,test.output,memoryLimit,timeLimit,functionSignatureMeta)
            if(!token){
                updatedTestCases.error="Compilation Error"
                updatedTestCases.status=false
                updatedTestCases.memory=0
                updatedTestCases.runtime=0
                result.push(updatedTestCases)
                console.log("1break");

                break;
            } 
            const response= await this.juge0CodeExecute.getResultFromJudge0(token)  
            console.log(response);
            
            if(response.stdout){

                const match =response.stdout.match(/([\s\S]*?)__RESULT__:(.*)/);
                
                const logOut = match ? match[1].trim() : '';      
                const actualOutput = match && match[2] ? match[2].trim() : '';  
                const status = test.output.trim() == actualOutput;
                
                updatedTestCases.status=status   //accept or not 
                updatedTestCases.logOut=logOut
                updatedTestCases.compile_output=actualOutput
                updatedTestCases.memory=response.memory
                updatedTestCases.runtime=response.runtime
                updatedTestCases.error=response.stderr
                updatedTestCases.runtime=response.runtime
                
                if(!status && stopFailTestCase){

                 result.push(updatedTestCases)
                 console.log("2break");
                 
                    break
                } 
                
                
            }else{
                
                updatedTestCases.status=false
                updatedTestCases.error=response.stderr
                updatedTestCases.memory=0
                updatedTestCases.runtime=0
                console.log(response.stderr,"thisi is the err in the ouput");
                
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