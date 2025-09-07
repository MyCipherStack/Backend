import { logger } from '@/infrastructure/logger/WinstonLogger/logger';
import { IAdminDashBoardUseCase } from '@/application/interfaces/use-cases/IAdminUseCase';
import { IUserRepository } from '@/domain/repositories/IUserRepository';
import { ITransactionRepository } from '@/domain/repositories/ITransactionRepository';

export class AdminDashBoardUseCase implements IAdminDashBoardUseCase {
  constructor(
        private userRepository: IUserRepository,
        private transactionRepotitory: ITransactionRepository,
  ) { }

  async execute(range: string): Promise<{ userData: { range: string; usersCount: number; }[]; totalUsers: number; premiumUsers: number; transactions: { range: string; revenue: string; }[]; thisMonthRevenu: number; } | null> {
    logger.info('admin usecase');
    let startDate;
    switch (range) {
      case '24hr':
        startDate = new Date(Date.now() - 24 * 60 * 60 * 1000);
        break;
      case '7d':
        startDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
        break;
      case '30d':
        startDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
        break;
      case '1y':
        startDate = new Date(Date.now() - 365 * 24 * 60 * 60 * 1000);
        break;
      default:
        startDate = new Date(Date.now() - 7 * 60 * 60 * 1000);
        break;
    }

    const format = range == '24h' ? '%Y-%m-%d %H:00' : '%Y-%m-%d';

    const data = await this.userRepository.userGrowthByRange(format, startDate);
    const transations = await this.transactionRepotitory.transatonsGrowthByRange(format, startDate);

    const totalUsers = data?.totalUser.totalUsers || 0;
    const premiumUsers = data?.totalUser.premiumUsers || 0;
    const thisMonthRevenu = transations?.thisMonth || 0;

    return {
      userData: data?.userDetails!, totalUsers, premiumUsers, transactions: transations?.transactionDetails!, thisMonthRevenu,
    };


  }
}
