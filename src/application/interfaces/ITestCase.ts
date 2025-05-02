

export interface ITestCase {
    testCaseNo:number;
    input: string;
    output: string; 
    isSample: boolean;
    compile_output?:string
    error?:string
    logOut?:string
    status?:boolean
    runtime?:number
    memory?:number
  }
