import { ITestCase } from "../interfaces/ITestCase.js";
import { IsubmitProblemUseCase } from "../interfaces/use-cases/IProblemUseCases.js";






export class submitProblemUseCase implements IsubmitProblemUseCase{
    constructor(
        private submissionModel:
    ){}

    async execute(testCases: ITestCase[]): Promise<ITestCase> {

        
        
    }

}