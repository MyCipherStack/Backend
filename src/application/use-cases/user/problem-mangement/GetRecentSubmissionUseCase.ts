import { IGetRecentSubmissionUseCase } from '@/application/interfaces/use-cases/ISubmissoinUseCase';
import { Submission } from '@/domain/entities/Submission';
import { ISubmissionRepository } from '@/domain/repositories/ISubmissionRepository';

export class GetRecentSubmissionUseCase implements IGetRecentSubmissionUseCase {
  constructor(
        private submissionRespositry: ISubmissionRepository,
  ) { }

  async execute(userId: string, limit: number): Promise<Submission[]> {
    const submission = await this.submissionRespositry.getAllRecentSubmission(userId, limit);

    return submission;
  }
}
