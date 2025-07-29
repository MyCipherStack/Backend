import { IEndChallengeUseCase } from "@/application/interfaces/use-cases/IChallengeUseCases";
import { IBullmqQueueService } from "@/domain/services/IBullmqServices";
import { logger } from "@/infrastructure/logger/WinstonLogger/logger";







export class EndChallengeUseCase implements IEndChallengeUseCase{

    constructor(
        private bullmqQueueService:IBullmqQueueService
    ){}
    

   async execute(challengeId: string,delay:number): Promise<void> {

    logger.info("endChallenge called ",{challengeId,delay})
        await this.bullmqQueueService.addJob("evaluate-winners",{challengeId},{
            delay,
            removeOnComplete:true
        })
    }
}