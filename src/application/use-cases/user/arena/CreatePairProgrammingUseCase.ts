import { customAlphabet } from "nanoid";
import { IPairProgramming } from "@/application/interfaces/IChallengeInterfaces";
import { ICreatePairProgrammingUseCase } from "@/application/interfaces/use-cases/IChallengeUseCases";
import { IPairProgrammingRepository } from "@/domain/repositories/IPairProgrammingRepository";
import { IProblemRepository } from "@/domain/repositories/IProblemRepository";
import { logger } from "@/logger";



export class CreatePairProgrammingUseCase implements ICreatePairProgrammingUseCase {
    constructor(
        private pairProgrammingRepository: IPairProgrammingRepository,
        private problemRepository: IProblemRepository
    ) { }
    async execute(data: IPairProgramming): Promise<string | null> {

        const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyz1234567890', 6);  //SET GROUP CHALLENGE

        logger.info(data.problemType)
        if (data.problemType === "random") {
            logger.info("random")
            const random = await this.problemRepository.getRadomDocument()
            logger.info("random", { random })
            if (random?._id) {
                logger.info("random3")
                data.problems = [random._id?.toString()]
            }
        }

        
    
        const createdChallenge = await this.pairProgrammingRepository.create({ ...data, duration: 1, joinCode: "cipher-" + nanoid() })
        console.log(createdChallenge);

        if (!createdChallenge.joinCode) return null
        return createdChallenge.joinCode
    }
}