
import { logger } from "@/logger";
import { IAdminDashBoardUseCase } from "../interfaces/use-cases/IAdminDashBoardUseCase";
import { IUserRepository } from "@/domain/repositories/IUserRepository";
import { ITransactionRepotitory } from "@/domain/repositories/ITransactionRepotitory";




export class AdminDashBoardUseCase implements IAdminDashBoardUseCase {
    constructor(
        private userRepository: IUserRepository,
        private transactionRepotitory: ITransactionRepotitory
    ) { }

    async execute(range: string) {
        logger.info("admin usecase")
        let startDate
        switch (range) {
            case '24hr':
                startDate = new Date(Date.now() - 24 * 60 * 60 * 1000)
                break;
            case '7d':
                startDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
                break;
            case '30d':
                startDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
                break;
            case '1y':
                startDate = new Date(Date.now() - 365 * 24 * 60 * 60 * 1000)
                break;
            default:
                startDate = new Date(Date.now() - 7 * 60 * 60 * 1000)
                break;

        }

        const format = range == "24h" ? '%Y-%m-%d %H:00' : "%Y-%m-%d"

        const data = await this.userRepository.userGrowthByRange(format, startDate)
        const transations = await this.transactionRepotitory.transatonsGrowthByRange(format, startDate)




        //  logger.info("dashBoardData",{data})
        let totalUsers = data.totalUser[0].totalUsers
        let premiumUsers = data.totalUser[0].premiumUsers


        return { userData: data.userDetails, totalUsers, premiumUsers, transactions: transations.transactionDetails,thisMonthRevenu:transations.thisMonth }

    }
}