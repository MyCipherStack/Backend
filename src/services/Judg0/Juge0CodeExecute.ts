import axios from "axios"
import { error } from "console";
import { generateWrapper } from "./helper/generateWrapper.js";
import { IJuge0CodeExecute } from "../../domain/services/IJudge0CodeExecute.js";


const JUDGE0_API_URL='http://localhost:2358/submissions';
// const JUDGE0_API_URL='http://localhost:2358/submissions?base64_encoded=false';


export default class Juge0CodeExecute {
    


 async codeSubmitToJudge0(
    language:string,
    code:string,
    stdin:string,
    expectedOutput:string,
    memoryLimit:number=128,
    timeLimit:number=1000,
    functionSignatureMeta:{}
        ){
            try{
                // console.log(expectedOutput,"Expeted output");
                
                // console.log(stdin,expectedOutput);
                
  

        // const wrappedCode = `
        // ${code}
        // const readline = require('readline');
        // const rl = readline.createInterface({
        //   input: process.stdin,
        //   output: process.stdout
        // });
        
        // rl.on('line', (input) => {
        //   const result = isValid(input);
        //   console.log(result);
        //   rl.close();
        // });
        // `;
                

        const wrappedCode= await generateWrapper(code,functionSignatureMeta,language)

                
        const response=await axios.post(JUDGE0_API_URL,
        {
            source_code:wrappedCode,
            language_id:this.getLanguageId(language),
            stdin,
            // expected_output:`${expectedOutput.trim()}\n`,
            // cpu_time_limit:timeLimit,
            // memory_limit:memoryLimit,
            base64_encoded: false,
            wait: true,
            cache:false
        },{
            headers: {
                'Content-Type': 'application/json',
                // 'Authorization': `Bearer ${process.env.JUDGE0_API_KEY}`,
                'X-Auth-Token': "yourSecretTokenHere", // Authentication header
                'X-Auth-User': "yourSecretTokenHere",  // Authorization header
              }, timeout: 10000,
        },)
    
        const {token}=response.data
        return token
        
            }catch(error){
                console.log(error,"submit code err");
                
            }
        }



    async getResultFromJudge0(token:string){
            try{

                while(true){

    const response = await axios.get(`${JUDGE0_API_URL}/${token}?base64_encoded=false`,{
        headers: {
            'Content-Type': 'application/json',
            'X-Auth-Token': "yourSecretTokenHere", // Authentication header
            'X-Auth-User': "yourSecretTokenHere",  // Authorization header
        }
    });
    const data = response.data;
    // console.log(data,"data from getResult token");
    
    if(data.status.id>=3){
        console.log(data);
        
        return{
            success:data.status.id === 3,
            stdout:data.stdout,
            stderr:data.stderr,
            compile_output: data.compile_output,
            memory:data.memory,
            runtime:data.time,
            message:data.message,
            status:data.status
            
        
        }
    }
    await new Promise(resolve => setTimeout(resolve, 1000));
    // else{
    //         return {
    //             success: false,
    //             error: data.stderr || 'Unknown error during execution.',
    //         };
    //     }
        
    }
    }catch(error){
                console.error('Error fetching result from Judge0:', error);
                throw new Error('Failed to fetch result from Judge0');
            }
        }
        private  getLanguageId(language:string):number{
            const languages:{[key:string]:number}={
                javascript: 63,
                python: 71, 
                java: 62,
                typescript: 93,
            }
            return languages[language.toLowerCase()] || 63
        }
}