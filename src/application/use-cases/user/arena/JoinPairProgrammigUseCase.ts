import { logger } from "@/logger";
import { IPairProgrammingRepository } from "@/domain/repositories/IPairProgrammingRepository";
import { PairProgramming } from "@/domain/entities/PairProgramming";
import { IJoinPairProgrammigUseCase } from "@/application/interfaces/use-cases/IChallengeUseCases";





export class JoinPairProgrammigUseCase implements IJoinPairProgrammigUseCase {
    constructor(

        private pairProgrammingRepository: IPairProgrammingRepository,


    ) { }
    async execute(joinCode: string, userId: string, userName: string): Promise<PairProgramming | null> {
        // logger.info("join useCase",{joinCode,userId,userName})
        const respositoryData = await this.pairProgrammingRepository.findOneChallenge({ joinCode })
        // logger.info("hostID",{id:respositoryData?.hostId})
        // console.log(respositoryData, joinCode, "joinedDATA");
        

        if (respositoryData) {
            if (respositoryData.hostId == userId) {
            
                return respositoryData
            } else {
                logger.info("sameuser",{navigator:respositoryData.navigator,userId});
                
                logger.info("check",{navigator:respositoryData.navigator.id===userId});


                if(respositoryData.navigator && respositoryData.navigator.id==userId){
                    
                    logger.info("if",{navigator:respositoryData.navigator,userId});

                    
                    return respositoryData
                }
                if (!respositoryData.navigator?.id && respositoryData._id ) {

                    let navigator = { name: userName, id: userId }

                    const updatedData = await this.pairProgrammingRepository.updateOneById(respositoryData._id, { navigator })

                    return updatedData
                } else {
                    throw new Error("navigator already joined can't join right now")

                }
            }


        } else {
            throw new Error("This challenge is not exits or code expired ")
        }

    }
}