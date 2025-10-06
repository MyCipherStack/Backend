
import { Problem } from '@/domain/entities/Problem';
import { ITestCase } from '../ITestCase';
import { Submission } from '@/domain/entities/Submission';
import { ProblemDTO } from '@/application/dto/ProblemDTO';
import { FilterDTO } from '@/application/dto/FilterDTO';

export interface IAddProblemUseCase {
    execute(problem: Problem): Promise<Problem | null>
}

export interface IEditProblemUseCase {

    execute(id: string, problem: Problem): Promise<Problem | null>

}
export interface IRunProblemUseCase {

    execute(testCases: ITestCase[], code: string, language: string, memoryLimit: number, timeLimit: number, functionSignatureMeta: {}, stopFailTestCase: boolean): Promise<ITestCase[]>
}

export interface IsubmitProblemUseCase {
    execute(testCases: ITestCase[], userId: string, problemId: string, code: string, language: string, totalTestCases: number): Promise<Submission>
}
export interface IAcceptedUserProblemsUseCase {
    execute(userId: string): Promise<{
        datas: Problem[], problemCount: {
            easy: number;
            medium: number;
            hard: number;
        },
        totalSubmissions: number,
        totalProblemsCount: Record<string, number>,

    }>
}



export interface IGetAllProblemUseCase {
    execute(problemDto: FilterDTO, difficulty: string, category: string): Promise<{
        problems: Problem[];
        totalProblems: number;
        totalPages: number;
    }>
}
