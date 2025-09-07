import { Problem } from '@/domain/entities/Problem';
import { IProblemRepository } from '@/domain/repositories/IProblemRepository';
import { IEditProblemUseCase } from '@/application/interfaces/use-cases/IProblemUseCases';
import { ProblemMapper } from '@/application/mapper/ProblemMapper';

export class EditProblemUseCase implements IEditProblemUseCase {
  constructor(
        private problemRepository:IProblemRepository,
  ) {}

  async execute(id:string, problem:Problem) {
    const data = await this.problemRepository.editProblem(id, problem);

    return data ? ProblemMapper.toResponseDTO(data) : null;
    
  }
}
