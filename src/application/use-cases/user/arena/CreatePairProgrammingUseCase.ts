import { customAlphabet } from "nanoid";
import { IPairProgramming } from "@/application/interfaces/IChallengeInterfaces";
import { ICreatePairProgrammingUseCase } from "@/application/interfaces/use-cases/IChallengeUseCases";
import { IPairProgrammingRepository } from "@/domain/repositories/IPairProgrammingRepository";
import { IProblemRepository } from "@/domain/repositories/IProblemRepository";
import { logger } from "@/logger";
import { INotificationSocket } from "@/domain/services/ISocketService";
import { IGetUserDataBynameUseCase } from "@/application/interfaces/use-cases/IUserUseCase";
import { INotificationRepository } from "@/domain/repositories/INotificationRepository";



export class CreatePairProgrammingUseCase implements ICreatePairProgrammingUseCase {
    constructor(

        private pairProgrammingRepository: IPairProgrammingRepository,
        private problemRepository: IProblemRepository,
        private notificationService: INotificationSocket,
        private getUserDataBynameUseCase: IGetUserDataBynameUseCase,
        private notificationRepository: INotificationRepository

    ) { }
    async execute(data: IPairProgramming): Promise<string | null> {

        const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyz1234567890', 6);  //SET GROUP CHALLENGE

        // console.log("notification",this.notificationService,this.getUserDataBynameUseCase)


        if (data.problemType === "random") {
            logger.info("random")
            const random = await this.problemRepository.getRadomDocument()
            logger.info("random", { random })
            if (random?._id) {
                logger.info("random3")
                data.problems = [random._id?.toString()]
            }
        }


        const createdJoinCode="cipher-" + nanoid() 

        if (data.invitedUsers) {
            data.invitedUsers.map(async (userName) => {
                const data = await this.getUserDataBynameUseCase.exectue(userName)
                if (data?._id) {

                    const notificationData = {
                        title: "Arena update",
                        message: "Requsted a pairProgam invite",
                        link: `pairProgramming/${createdJoinCode}`
                    }

                    const notification = await this.notificationRepository.create({ userId: data._id, ...notificationData })

                    this.notificationService.emitNotification(notification?.userId, notification)



                }
            })
        }



        const createdChallenge = await this.pairProgrammingRepository.create({ ...data, duration: 1, joinCode:createdJoinCode })

        console.log(createdChallenge);


        if (!createdChallenge.joinCode) return null
        return createdChallenge.joinCode
    }
}