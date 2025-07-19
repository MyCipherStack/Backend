import { logger } from "@/logger";
import { IPairProgrammingRepository } from "@/domain/repositories/IPairProgrammingRepository";
import { PairProgramming } from "@/domain/entities/PairProgramming";
import { IJoinPairProgrammigUseCase } from "@/application/interfaces/use-cases/IChallengeUseCases";





export class JoinPairProgrammigUseCase implements IJoinPairProgrammigUseCase {
    constructor(

        private pairProgrammingRepository: IPairProgrammingRepository,



    ) { }
    async execute(joinCode: string, userId: string, userName: string): Promise<PairProgramming | null> {

        const respositoryData = await this.pairProgrammingRepository.findOneChallenge({ joinCode })
        

        if (respositoryData) {
            if (respositoryData.hostId == userId) {
            
                return respositoryData
            } else {

                
                let navigatorId=respositoryData.navigator?.id
            
                
                if(respositoryData.navigator?.id && navigatorId?.toString()==userId.toString()){
                    
                    logger.info("if",{navigator:respositoryData.navigator,userId});

                    
                    return respositoryData
                }
                //if no current navigator so join that
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