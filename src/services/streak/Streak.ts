import { AppError } from "@/domain/error/AppError.js";
import { IUserRepository } from "../../domain/repositories/IUserRepository.js";
import { IStreakService } from "../../domain/services/IStreakService.js";
import { HttpStatusCode } from "@/shared/constants/HttpStatusCode.js";



export class StreakService implements IStreakService {
    constructor(
        private userRepository: IUserRepository
    ) { }

    async updateUserStreak(id: string): Promise<boolean> {
        const userData = await this.userRepository.findById(id)
        if (userData?.streak?.currentStreak) {

            let currentDate = new Date()
            let lastActiveDate = userData.streak.lastActiveDate

            let diff = currentDate.getTime() - lastActiveDate.getTime()
            let diffInHours = diff / (1000 * 60 * 60)
            if (diffInHours > 24) {

                this.userRepository.updateFieldsByEmail(userData.email, { streak: { lastActiveDate: new Date(), currentStreak: 1, higestStreak: userData.streak.higestStreak } })

            } else if (userData.streak.lastActiveDate.getDate() != new Date().getDate()) {
                console.log("updated today Streak");

                let currentStreak = userData.streak.currentStreak + 1
                let higestStreak = userData.streak.higestStreak < currentStreak ? currentStreak : userData.streak.higestStreak
                this.userRepository.updateFieldsByEmail(userData.email, { streak: { lastActiveDate: new Date(), currentStreak, higestStreak } })
            }
        }
        else {
            console.log("not started Streak");
            if (userData) {

                this.userRepository.updateFieldsByEmail(userData.email, { streak: { lastActiveDate: new Date(), currentStreak: 1, higestStreak: 1 } })
            } else {
                throw new AppError("Unexpected behaviour", HttpStatusCode.BAD_REQUEST)
            }

        }
        return true

    }
} 