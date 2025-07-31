

import { IEvaluateWinnerUsecase } from "@/application/interfaces/use-cases/IChallengeUseCases";
import { redisConnection } from "@/infrastructure/database/connection/redisConnection";
import { logger } from "@/infrastructure/logger/WinstonLogger/logger";
import { Worker } from 'bullmq'






export class EvaluateWinnerWorker {

    constructor(
        private evaluateUseCase: IEvaluateWinnerUsecase
    ) { }

    execute = () => {

        try{

            logger.info("worker stated")
            
            // new QueueScheduler("evaluate-winners", { connection: redisConnection });
            
            new Worker("evaluate-winners", async (job) => {
                
                const { challengeId } = job.data
                
                await this.evaluateUseCase.execute(challengeId)
                
            },
            { connection: redisConnection })
        }catch(error){
            logger.error("errr in evaluvate woker ",error)
        }

    }
    }
    
