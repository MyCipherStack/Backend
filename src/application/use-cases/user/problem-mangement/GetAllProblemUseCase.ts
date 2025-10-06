import { FilterDTO } from "@/application/dto/FilterDTO";
import { ProblemDTO } from "@/application/dto/ProblemDTO";
import { IGetAllProblemUseCase } from "@/application/interfaces/use-cases/IProblemUseCases";
import { ProblemMapper } from "@/application/mapper/ProblemMapper";
import { Problem } from "@/domain/entities/Problem";
import { IProblemRepository } from "@/domain/repositories/IProblemRepository";





export class GetAllProblemUseCase implements IGetAllProblemUseCase {

    constructor(
        private problemRepository: IProblemRepository

    ) { }

    async execute(problemDto: FilterDTO, difficulty: string, category: string): Promise<{
        problems: Problem[];
        totalProblems: number;
        totalPages: number;
    }> {

        const data = await this.problemRepository.getFilterProblem({
            ...problemDto, difficulty, category,
        });
        const problems = data.problems.map((problem) => ({
            ...problem,
            testCases: problem.testCases.filter((tc) => tc.isSample),
        }));
        
        // const problems = data.problems.map((problem) => (ProblemMapper.toResponseDTO(problem)));


        const sampleTestCasesOnlyData = { ...data, problems };

        return sampleTestCasesOnlyData;

    }
}