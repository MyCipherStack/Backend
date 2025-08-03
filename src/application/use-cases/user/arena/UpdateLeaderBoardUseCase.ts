import { leaderBoard } from '@/domain/entities/LeaderBoard';
import { IChallengeRepository } from '@/domain/repositories/IChallengeRepository';
import { ILeaderBoardRepository } from '@/domain/repositories/ILeaderBoardRepository';
import { IUpdateLeaderBoardUsecase } from '@/application/interfaces/use-cases/ILeaderBoadrUseCase';
import { IUserRepository } from '@/domain/repositories/IUserRepository';

import { logger } from '@/infrastructure/logger/WinstonLogger/logger';

export class UpdateLeaderBoardUseCase implements IUpdateLeaderBoardUsecase {
  constructor(
        private leaderBoardRepository: ILeaderBoardRepository,
        private challengeReposiotry: IChallengeRepository,
        private userRepository:IUserRepository,

  ) {}

  async execute(userId: string, challengeId: string, updateData: { time: Date, problemId: string, submissionId: string }): Promise<leaderBoard | null> {
    const challengeData = await this.challengeReposiotry.findById(challengeId);

    if (challengeData?.isBlocked) {
      throw new Error('Challenge is blocked by admin');
    }

    const now = new Date();

    const startTime = new Date(challengeData?.startTime || '');

    const TimeUsed = now.getTime() - startTime.getTime();

    const second = Math.floor(TimeUsed / 1000);

    const minutes = Math.floor(second / 60) + 60;

    if (minutes < 0) {
      throw new Error('Challenge not started');
    }
    const score = Math.floor(1000 / minutes);

    const leaderBoardData = await this.leaderBoardRepository.findOne({ userId, challengeId });
    // const alreadySolved = await this.leaderBoardRepository.findOne({ userId, challengeId, 'solvedProblems.problemId': updateData.problemId })

    // console.log(leaderBoardData?.solvedProblems?.some({problemId}),"eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee")

    const isAlreadySolved = leaderBoardData?.solvedProblems?.some((problem) => problem.problemId == updateData.problemId);

    console.log(isAlreadySolved, 'isalreadysolved');

    if (isAlreadySolved) {
      throw new Error('This is already solved problem in this challenge');
    }

    logger.info('update leaderboard', { second, minutes, score });

    const updatedData = await this.leaderBoardRepository.findOneAndUpdate({ userId, challengeId }, {
      time: minutes.toString(), problemId: updateData.problemId, submissionId: updateData.submissionId, score,
    });

    const updatedUserScore = await this.userRepository.updatePoints(userId, score);

    logger.info('updatedScoreData', { updatedUserScore });

    if (!updatedData) return null;

    return updatedData;
  }
}
