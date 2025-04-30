
export interface IJuge0CodeExecute{

    codeSubmitToJudge0(
        language:string,
        code:string,
        stdin:string,
        expectedOutput:string,
        memoryLimit:number,
        timeLimit:number,
        functionSignatureMeta:{}
    ):Promise<string|null>

    getResultFromJudge0(token:string):Promise<{
        success:boolean
            output:string,
            error:string,
            compile_output:string,
            memory:string
    }>


}

