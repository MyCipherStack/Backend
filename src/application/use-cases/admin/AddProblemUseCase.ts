import { ProblemMapper } from '@/application/mapper/ProblemMapper';
import { Problem } from '../../../domain/entities/Problem';
import { IProblemRepository } from '../../../domain/repositories/IProblemRepository';
import { IAddProblemUseCase } from '../../interfaces/use-cases/IProblemUseCases';

export class AddProblemUseCase implements IAddProblemUseCase {
  constructor(
    private problemRepository: IProblemRepository,
  ) { }

  async execute(problem: Problem) {
    const data = await this.problemRepository.create(problem);

    if (data) {
      return ProblemMapper.toResponseDTO(data)
    }
    
    return null


  }
}
