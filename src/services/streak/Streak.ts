import { AppError } from '@/domain/error/AppError';
import { IUserRepository } from '@/domain/repositories/IUserRepository';
import { IStreakService } from '@/domain/services/IStreakService';
import { HttpStatusCode } from '@/shared/constants/HttpStatusCode';

export class StreakService implements IStreakService {
  constructor(
        private userRepository: IUserRepository,
  ) { }

  async updateUserStreak(id: string): Promise<boolean> {
    const userData = await this.userRepository.findById(id);
    if (userData?.streak?.currentStreak) {
      const currentDate = new Date();
      const { lastActiveDate } = userData.streak;

      const diff = currentDate.getTime() - lastActiveDate.getTime();
      const diffInHours = diff / (1000 * 60 * 60);
      if (diffInHours > 24) {
        this.userRepository.updateFieldsByEmail(userData.email, { streak: { lastActiveDate: new Date(), currentStreak: 1, higestStreak: userData.streak.higestStreak } });
      } else if (userData.streak.lastActiveDate.getDate() != new Date().getDate()) {
        console.log('updated today Streak');

        const currentStreak = userData.streak.currentStreak + 1;
        const higestStreak = userData.streak.higestStreak < currentStreak ? currentStreak : userData.streak.higestStreak;
        this.userRepository.updateFieldsByEmail(userData.email, { streak: { lastActiveDate: new Date(), currentStreak, higestStreak } });
      }
    } else {
      console.log('not started Streak');
      if (userData) {
        this.userRepository.updateFieldsByEmail(userData.email, { streak: { lastActiveDate: new Date(), currentStreak: 1, higestStreak: 1 } });
      } else {
        throw new AppError('Unexpected behaviour', HttpStatusCode.BAD_REQUEST);
      }
    }
    return true;
  }
}
